import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Save ticket
router.post("/", async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.json({ message: "Ticket saved", newTicket });
});

// Get all tickets
router.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

export default router;
