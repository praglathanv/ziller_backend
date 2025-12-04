import mongoose from "mongoose";

const passSchema = new mongoose.Schema({
  userId: String,           // who bought the pass
  userName: String,         // user name
  passType: String,         // Monthly/Weekly/Student pass
  startPoint: Object,       // start location
  endPoint: Object,         // destination
  price: Number,            // cost of pass
  validFrom: { type: Date, default: Date.now },
  validTill: Date,          // expiry date
  active: { type: Boolean, default: true }, // pass status
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pass", passSchema);
