const { Router } = require("express");
const { getMessage, createMessage } = require("../conrtrollers/chatController");

const router = Router();
router.get("/", getMessage);
router.post("/", createMessage);

module.exports = router;
