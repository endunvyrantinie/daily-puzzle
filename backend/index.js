const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/puzzle/today", (req, res) => {
  res.json({
    sequence: [2, 6, 12, 20]
  });
});

app.post("/puzzle/answer", (req, res) => {
  const { answer } = req.body;
  res.json({
    correct: Number(answer) === 30
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
