import express from "express";
import Pass from "../models/Pass.js";

const router = express.Router();

// Create Pass
router.post("/", async (req, res) => {
  try {
    const newPass = new Pass(req.body);
    await newPass.save();
    res.json({ message: "Pass booked successfully", newPass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all passes
router.get("/", async (req, res) => {
  try {
    const passes = await Pass.find();
    res.json(passes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pass by user
router.get("/:userId", async (req, res) => {
  try {
    const pass = await Pass.find({ userId: req.params.userId });
    res.json(pass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deactivate pass
router.patch("/deactivate/:id", async (req, res) => {
  try {
    const pass = await Pass.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    res.json({ message: "Pass deactivated", pass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
