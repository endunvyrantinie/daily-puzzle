import { useEffect, useState } from "react";

export default function Home() {
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/puzzle/today")
      .then((res) => res.json())
      .then((data) => setSequence(data.sequence))
      .catch(() => setResult("❌ Failed to load puzzle"));
  }, []);

  const checkAnswer = () => {
    if (answer === "30") {
      setResult("✅ Correct! Nice one.");
    } else {
      setResult("❌ Wrong. Try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>🧠 Daily Pattern Puzzle</h1>

        <p className="sequence">
          {sequence.length > 0
            ? sequence.join(" → ") + " → ?"
            : "Loading..."}
        </p>

        <input
          type="number"
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button onClick={checkAnswer}>Check Answer</button>

        {result && <p className="result">{result}</p>}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #020617);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: system-ui, sans-serif;
          color: #e5e7eb;
        }

        .card {
          background: #020617;
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          text-align: center;
        }

        h1 {
          margin-bottom: 16px;
          font-size: 1.8rem;
        }

        .sequence {
          font-size: 1.4rem;
          letter-spacing: 1px;
          margin-bottom: 24px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          margin-bottom: 16px;
        }

        input:focus {
          outline: 2px solid #38bdf8;
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          background: #38bdf8;
          color: #020617;
          cursor: pointer;
        }

        button:hover {
          background: #0ea5e9;
        }

        .result {
          margin-top: 16px;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
