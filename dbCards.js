import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true, unique: true },
});

export default mongoose.model("cards", cardSchema);
