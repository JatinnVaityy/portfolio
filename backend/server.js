const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "likes.json");

// Initialize likes.json if it doesn't exist
const initLikesFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ likes: 0 }, null, 2));
  }
};

// GET current likes
app.get("/likes", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("Error reading likes.json:", err);
    res.status(500).json({ error: "Failed to read likes" });
  }
});

// POST toggle like
app.post("/like", async (req, res) => {
  const { action } = req.body; // expects "like" or "unlike"
  if (!action || !["like", "unlike"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  try {
    const fileData = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(fileData);

    if (action === "like") {
      data.likes += 1;
    } else if (action === "unlike" && data.likes > 0) {
      data.likes -= 1;
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    console.error("Error updating likes.json:", err);
    res.status(500).json({ error: "Failed to update likes" });
  }
});

// Start server
initLikesFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
