import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Import Routes
import busRoutes from "./routes/busRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("✅ MongoDB Connected Successfully!");
});

// ✅ API Routes
app.use("/api/buses", busRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", userAuthRoutes); // 👈 User Register/Login

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running with MongoDB connected!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
