const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    allDay: {type: Boolean, default: false},
    description: {type: String},
    location: {type: String},
})

module.exports = mongoose.model("Event", eventSchema)