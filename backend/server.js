import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Like from "./models/Like.js";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Get likes
app.get("/likes", async (req, res) => {
  try {
    const count = await Like.countDocuments();
    res.json({ likes: count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
});

// Like / Unlike
app.post("/like", async (req, res) => {
  const { action, deviceId } = req.body;

  if (!deviceId) return res.status(400).json({ error: "Missing deviceId" });

  try {
    if (action === "like") {
      const existing = await Like.findOne({ deviceId });
      if (!existing) await Like.create({ deviceId });
    } else if (action === "unlike") {
      await Like.deleteOne({ deviceId });
    }

    const count = await Like.countDocuments();
    res.json({ likes: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update like" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
