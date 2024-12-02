const express = require("express")
const Event = require("../models/Event")

const router = express.Router()

router.get("/", async (req, res) => {
    console.log("GET /api/events received")
    try {
        const events = await Event.find()
        console.log("Fetched events from DB:", events); // Log the fetched events
        res.json(events)
    } catch (error) {
        console.error("Error fetching events:", error)
        res.status(500).json({message: "Server error"})
    }
})

router.post("/", async (req, res) => {
    try {
        const newEvent = new Event(req.body)
        const savedEvent = await newEvent.save()
        res.status(201).json(savedEvent)
    } catch (error) {
        console.error("Error saving event:", error)
        res.status(500).json({message: "Failed to save event"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedEvent)
    } catch (error) {
        console.error("Error updating event:", error)
        res.status(500).json({message: "Failed to update event"})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        console.error("Error deleting event:", error)
        res.status(500).json({message: "Failed to delete event"})
    }
})

module.exports = router