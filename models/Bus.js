import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model("Bus", busSchema);
