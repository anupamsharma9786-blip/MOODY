import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [scores, setScores] = useState({});

  useEffect(() => {
    async function init() {
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

      await startCamera();
      detectLoop();
    }

    init();

    return () => {
      cancelAnimationFrame(animationRef.current);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  async function startCamera() {
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

  function detectLoop() {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (video && faceLandmarker && video.readyState >= 2) {
      const result = faceLandmarker.detectForVideo(
        video,
        performance.now()
      );

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

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="500"
        style={{
          borderRadius: "12px",
          border: "2px solid black",
        }}
      />
      <button onClick={detectLoop}>Detect Expression</button>
      <h1>{expression}</h1>

      <div style={{ textAlign: "left", margin: "20px auto", width: "500px" }}>
        <h3>Important Scores</h3>

        <p>Smile Left: {scores.mouthSmileLeft?.toFixed(2) || 0}</p>
        <p>Smile Right: {scores.mouthSmileRight?.toFixed(2) || 0}</p>
        <p>Jaw Open: {scores.jawOpen?.toFixed(2) || 0}</p>
        <p>Brow Down Left: {scores.browDownLeft?.toFixed(2) || 0}</p>
        <p>Brow Down Right: {scores.browDownRight?.toFixed(2) || 0}</p>
        <p>Eye Blink Left: {scores.eyeBlinkLeft?.toFixed(2) || 0}</p>
        <p>Eye Blink Right: {scores.eyeBlinkRight?.toFixed(2) || 0}</p>
      </div>
    </div>
  );
}