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
            const allowedOrigins = [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        // origin: 
        //     process.env.NODE_ENV === "development"
        //         ? "http://localhost:5173" // Dev frontend
        //         : [
        //             "http://www.probablyawebsite.com",
        //             "https://www.probablyawebsite.com",
        //             "http://api.probablyawebsite.com",
        //             "https://api.probablyawebsite.com",
        //           ],
    
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

// if (process.env.NODE_ENV === "development") {
//     const { createProxyMiddleware } = require("http-proxy-middleware");
//     app.use(
//         "/",
//         createProxyMiddleware({
//             target: "http://localhost:5173", // Frontend dev server
//             changeOrigin: true,
//         })
//     );
// }

// Connect to MongoDB and start backend server
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));