const express = require("express");
const app = express();
const cors = require("cors");

// Route imports
const userRoutes = require("./routes/userRoutes");
const characterRoutes = require("./routes/characterRoutes");
const clientRoutes = require("./routes/clientRoute");
const chatRoutes = require("./routes/chatRoutes");
const baseRoutes = require("./routes/baseRoutes");
const quizRoutes = require("./routes/quizRoutes");
const generateImageRoutes = require("./routes/generateImageRoutes");
const movieQuizRoutes = require("./routes/movieQuizRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// Mount routers
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/character", characterRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/base", baseRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/generate-image", generateImageRoutes);
app.use("/api/movie-quiz", movieQuizRoutes);

module.exports = app;
