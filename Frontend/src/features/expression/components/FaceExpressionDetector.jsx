import { useEffect, useRef, useState } from "react";
import { detectLoop } from "../utils/utils";
import { init } from "../utils/utils";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [scores, setScores] = useState({});

  useEffect(() => {
    init({faceLandmarkerRef, detectLoop, videoRef});

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);


  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
      <button onClick={()=>{detectLoop({videoRef, faceLandmarkerRef, setScores, setExpression})}}>Detect Expression</button>
      <h1>{expression}</h1>
    </div>
  );
}