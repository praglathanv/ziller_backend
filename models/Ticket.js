import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  busId: String,
  busName: String,
  userName: String, 
  amount: Number,
  start: Object,
  destination: Object,
  distance: Number,
  date: { type: Date, default: Date.now },
  userId: { type: String }, // optional (later for login)
  active: { type: Boolean, default: true } // new field to track if ticket is active
});

export default mongoose.model("Ticket", ticketSchema);
