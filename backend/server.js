const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./likes.json";

// Initialize likes.json if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ likes: 0 }));
}

// GET current likes
app.get("/likes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// POST toggle like (increment or decrement)
app.post("/like", (req, res) => {
  const { action } = req.body; // "like" or "unlike"
  const data = JSON.parse(fs.readFileSync(DATA_FILE));

  if (action === "like") data.likes += 1;
  else if (action === "unlike" && data.likes > 0) data.likes -= 1;

  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
