const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const path = require("path")


dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json()); // Parses incoming JSON requests
app.use(
    cors({
        // origin: ["http://127.0.0.1:5173", "http://localhost:5173"], // Frontend's exact origin
        origin: [      
            "http://www.probablyawebsite.com", 
            "https://www.probablyawebsite.com",
            "http://api.probablyawebsite.com", 
            "https://api.probablyawebsite.com"
        ], // Frontend's exact origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

const tasksRoutes = require("./routes/tasks")
app.use("/api/tasks", tasksRoutes);

// Catch-all route for serving the frontend (only if required in production)
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.join(__dirname, "frontend", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}



// Load environment variables


// Initialize Express app




// Simple route for testing
app.get("/", (req, res) => {
    res.send("Backend is now runig")
})

// Connect to MongoDB and start backend server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => {
//         console.log("Conneted to M ongoDB")
//         app.listen(PORT, () => {
//             console.log(`Serviers is running on http://localhost:${PORT}`)
//         })
//     })
//     .catch((err) => {
//         console.error("Failed to connec MongoDB", err)
//     })



// Start server
app.listen(PORT, "0.0.0.0", () => console.log(`Server is running on http://0.0.0.0:${PORT}`));