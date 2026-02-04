import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "https://zillertickets.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
import busRoutes from "./routes/busRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import passRoutes from "./routes/passRoutes.js";

app.use("/api/buses", busRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/passes", passRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", userAuthRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running with MongoDB connected!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
