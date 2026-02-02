import { useEffect, useState } from "react";

export default function Home() {
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/puzzle/today")
      .then(res => res.json())
      .then(data => setSequence(data.sequence));
  }, []);

  const submitAnswer = async () => {
    const res = await fetch("http://localhost:5000/puzzle/answer", {
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

      <h2>{sequence.join(" → ")} → ?</h2>

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
