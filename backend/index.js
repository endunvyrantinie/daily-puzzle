const express = require("express");
const cors = require("cors");

const app = express();

/**
 * 🔥 IMPORTANT
 * Allow ALL origins so Vercel can fetch
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use(express.json());

/**
 * Daily puzzle endpoint
 */
app.get("/puzzle/today", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    sequence: [2, 6, 12, 20],
  });
});

/**
 * Health check (optional but good)
 */
app.get("/", (req, res) => {
  res.send("Daily Puzzle API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});