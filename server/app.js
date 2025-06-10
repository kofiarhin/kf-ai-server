const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const characterRoutes = require("./routes/characterRoutes");
const clientRoutes = require("./routes/clientRoute");
const chatRoutes = require("./routes/chatRoutes");
const baseRoutes = require("./routes/baseRoutes");
const cors = require("cors");

// setupmiddleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});
app.get("/api/users", (req, res) => {
  return res.json({ message: apiKey });
});

app.use("/api/character", characterRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/base", baseRoutes);

module.exports = app;
