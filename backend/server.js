const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

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
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify({ likes: [], count: 0 }, null, 2)
    );
  }
};

// GET current likes count
app.get("/likes", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    res.json({ likes: data.count || 0 });
  } catch (err) {
    console.error("Error reading likes.json:", err);
    res.status(500).json({ error: "Failed to read likes" });
  }
});

// POST toggle like
app.post("/like", async (req, res) => {
  const { action, deviceId } = req.body;
  if (!action || !["like", "unlike"].includes(action) || !deviceId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const fileData = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    const likesSet = new Set(fileData.likes);

    if (action === "like") likesSet.add(deviceId);
    else likesSet.delete(deviceId);

    const newLikes = Array.from(likesSet);
    const count = newLikes.length;

    await fs.writeFile(
      DATA_FILE,
      JSON.stringify({ likes: newLikes, count }, null, 2)
    );
    res.json({ likes: count });
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
