import express from "express";
import Bus from "../models/Bus.js";

const router = express.Router();

// Get all buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Add a new bus
router.post("/", async (req, res) => {
  const newBus = new Bus(req.body);
  await newBus.save();
  res.json({ message: "Bus added", newBus });
});

export default router;
