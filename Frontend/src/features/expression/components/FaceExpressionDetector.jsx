import { useEffect, useRef, useState } from "react";
import { detectLoop } from "../utils/utils";
import { init } from "../utils/utils";
import MoodPlayer from "./MoodPlayer.jsx";
import "../styles/Expression.scss";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [scores, setScores] = useState({});
  const [mood, setMood] = useState("");

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

  useEffect(() => {
    if (!expression || expression === "Loading model..." || expression === "No face detected") {
      setMood("");
      return;
    }

    const detectedMood = expression.split(" ")[0].toLowerCase();
    const moodMap = {
      happy: "happy",
      sad: "sad",
      surprised: "surprised",
      angry: "angry",
      neutral: "neutral",
    };

    setMood(moodMap[detectedMood] || "");
  }, [expression]);

  return (
    <main className="login-page mood-page">
      <section className="login-card mood-card">
        <header className="mood-header">
          <span className="mood-badge">🎧 Mood player</span>
          <h1 className="login-heading">Let your face shape the soundtrack</h1>
          <p className="login-subtitle">
            Turn your current emotion into a personalized playlist with the same polished look as the rest of Moody.
          </p>
        </header>

        <div className="mood-grid">
          <div className="mood-panel">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="mood-video"
            />
            <button
              className="login-button mood-button"
              onClick={() => detectLoop({ videoRef, faceLandmarkerRef, setScores, setExpression })}
            >
              Detect Expression
            </button>
            <div className="status-stack">
              <span className="status-pill accent">{expression}</span>
              <span className="status-pill">
                {mood ? `Mood: ${mood}` : 'Camera ready'}
              </span>
            </div>
          </div>

          <div className="mood-panel">
            <h2 className="player-title">Your mood soundtrack</h2>
            <p className="player-copy">
              Once a face expression is detected, Moody will recommend songs from your backend API and preview them here.
            </p>
            <MoodPlayer mood={mood} />
          </div>
        </div>
      </section>
    </main>
  );
}