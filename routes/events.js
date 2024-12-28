const express = require("express");
const Event = require("../models/Event");
const { authMiddleware } = require("./auth");

const router = express.Router();

// Get all events for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, userId: req.userId });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to add event" });
  }
});

// Update an event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

// Delete an event
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
