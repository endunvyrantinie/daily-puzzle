import { useEffect, useState } from "react";

export default function Home() {
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/puzzle/today")
      .then(res => res.json())
      .then(data => {
        setSequence(data.sequence || []);
        setLoading(false);
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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>DAILY PUZZLE</div>

        <h1 style={styles.sequence}>
          {loading ? "Loading…" : `${sequence.join("  →  ")}  →  ?`}
        </h1>

        <input
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Your answer"
          style={styles.input}
        />

        <button onClick={submitAnswer} style={styles.button}>
          Check Answer
        </button>

        {result !== null && (
          <div style={styles.result}>
            {result ? "🎉 Correct!" : "❌ Try again"}
          </div>
        )}

        <p style={styles.footer}>
          New puzzle every day • Train your brain
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    padding: 20
  },
  card: {
    background: "#ffffff",
    borderRadius: 18,
    padding: "32px 28px",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
  },
  badge: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#2563eb",
    marginBottom: 16
  },
  sequence: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 24
  },
  input: {
    width: "100%",
    padding: 14,
    fontSize: 18,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    marginBottom: 16
  },
  button: {
    width: "100%",
    padding: 14,
    fontSize: 18,
    fontWeight: 600,
    borderRadius: 10,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  },
  result: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: 600
  },
  footer: {
    marginTop: 28,
    fontSize: 12,
    color: "#64748b"
  }
};
