const express = require("express")
const Task = require("../models/Task")

const router = express.Router()

// Get all tasks
router.get("/", async (req, res) => {
    console.log("GET /api/tasks received");
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Add a new task
router.post("/", async (req, res) => {
    const newTask = new Task(req.body)
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
})

// Update a task
router.put("/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedTask)
})

// Delete a task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).send()
})

module.exports = router