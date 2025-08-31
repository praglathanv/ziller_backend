import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentSession: { type: Boolean, default: false } // ✅ New field
});

export default mongoose.model("Admin", adminSchema);
