const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const characterRoutes = require("./routes/characterRoutes");
const cors = require("cors");

// setupmiddleware
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});
app.get("/api/users", (req, res) => {
  return res.json({ message: apiKey });
});

app.use("/api/character", characterRoutes);

module.exports = app;
