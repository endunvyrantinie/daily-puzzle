import { useEffect, useState } from "react";

export default function Home() {
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/puzzle/today")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch puzzle");
        }
        return res.json();
      })
      .then(data => {
        setSequence(data.sequence || []);
      })
      .catch(() => {
        setError("Failed to load puzzle");
      });
  }, []);

  const submitAnswer = async () => {
    const res = await fetch("/api/puzzle/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer })
    });

    const data = await res.json();
    setResult(data.correct);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🧠 Daily Pattern Puzzle</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>
        {sequence.length > 0
          ? sequence.join(" → ")
          : "Loading..."}{" "}
        → ?
      </h2>

      <input
        type="number"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ padding: 8, fontSize: 16 }}
      />

      <br /><br />

      <button onClick={submitAnswer} style={{ padding: 10 }}>
        Submit
      </button>

      {result !== null && (
        <p style={{ marginTop: 20 }}>
          {result ? "✅ Correct!" : "❌ Wrong"}
        </p>
      )}
    </main>
  );
}
