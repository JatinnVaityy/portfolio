import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;
