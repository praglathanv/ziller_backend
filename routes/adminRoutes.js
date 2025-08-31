import express from "express";
import Admin from "../models/Admin.js";
import Ticket from "../models/Ticket.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Register admin
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashed });
  await admin.save();
  res.json({ message: "Admin created" });
});

// Login admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ error: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// ✅ Get current logged-in admin info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password"); // exclude password
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all admins
router.get("/all", async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id/session", verifyToken, async (req, res) => {
  try {
    const { currentSession } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { currentSession },
      { new: true }
    );
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Failed to update session" });
  }
});

// Close current session
router.post("/:adminId/close-session", async (req, res) => {
  const { adminId } = req.params;
  
  try {
    // 1. Update admin session
    await Admin.findByIdAndUpdate(adminId, { currentSession: false });

    // 2. Deactivate all active tickets for this admin
    await Ticket.updateMany(
      { busId: adminId, active: true }, 
      { $set: { active: false } }
    );

    res.json({ message: "Session closed and tickets archived" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to close session" });
  }
});


export default router;
