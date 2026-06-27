import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";


export async function init({faceLandmarkerRef, detectLoop, videoRef}) {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                delegate: "GPU",
            },
            runningMode: "VIDEO",
            numFaces: 1,
            outputFaceBlendshapes: true,
        }
    );

    await startCamera(videoRef);
}



async function startCamera(videoRef) {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

    videoRef.current.srcObject = stream;

    return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
        };
    });
}



export function detectLoop({ videoRef, faceLandmarkerRef, setScores, setExpression }) {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (video && faceLandmarker && video.readyState >= 2) {
        const result = faceLandmarker.detectForVideo(
            video,
            performance.now()
        );
        function getExpression(score) {

            const smile =
                (score.mouthSmileLeft || 0) +
                (score.mouthSmileRight || 0);

            const frown =
                (score.mouthFrownLeft || 0) +
                (score.mouthFrownRight || 0);

            const surprised =
                (score.jawOpen || 0) +
                (score.eyeWideLeft || 0) +
                (score.eyeWideRight || 0);

            const angry =
                (score.browDownLeft || 0) +
                (score.browDownRight || 0);

            const blink =
                (score.eyeBlinkLeft || 0) +
                (score.eyeBlinkRight || 0);

            console.log(frown)

            if (smile > 0.8) return "Happy 😊";
            if (surprised > 1.1) return "Surprised 😮";
            if (frown > 0.03) return "Sad 🙁";
            if (angry > 0.8) return "Angry 😠";
            if (blink > 1.3) return "Blinking 😑";

            return "Neutral 😐";
        }

        if (result.faceBlendshapes?.length > 0) {
            const blendshapes =
                result.faceBlendshapes[0].categories;

            const scoreObj = {};

            blendshapes.forEach((item) => {
                scoreObj[item.categoryName] = item.score;
            });

            setScores(scoreObj);
            setExpression(getExpression(scoreObj));
        } else {
            setExpression("No face detected");
        }
    }

}


