const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const path = require("path")


dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 80;

const app = express()

app.use(express.json()); // Parses incoming JSON requests
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins =
                process.env.NODE_ENV === "development"
                    ? ["http://localhost:5173", "http://127.0.0.1:5173"]
                    : [
                        "http://www.probablyawebsite.com",
                        "https://www.probablyawebsite.com",
                        "http://api.probablyawebsite.com",
                        "https://api.probablyawebsite.com",
                    ];
            // Allow no-origin requests for tools like Postman
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials if needed
    })
);

app.use((req, res, next) => console.log('Request logged at: ', Date.now()));
next()

const eventsRoutes = require("./routes/events");
app.use("/api/advents", eventsRoutes);

const tasksRoutes = require("./routes/tasks");
app.use("/api/tasks", tasksRoutes);

// Connect to MongoDB and start backend server
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));