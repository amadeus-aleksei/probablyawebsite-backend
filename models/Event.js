const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => !isNaN(Date.parse(value)),
            message: "Invalid date format for start",
        },
    },
    end: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => !isNaN(Date.parse(value)),
            message: "Invalid date format for end",
        },
    },
    allDay: {type: Boolean, default: false},
    description: {type: String},
    location: {type: String},
})

module.exports = mongoose.model("Event", eventSchema)