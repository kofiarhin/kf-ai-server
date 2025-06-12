const { Router } = require("express");
const { getMessage, createMessage } = require("../conrtrollers/chatController");

const router = Router();

// get welcome message
router.get("/", async (req, res) => {
  return res.json({ message: "Welcome to my boss man!" });
});

// chat with ai
router.post("/", createMessage);

module.exports = router;
