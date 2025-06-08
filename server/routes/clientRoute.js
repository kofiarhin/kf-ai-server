const { Router } = require("express");
const clienAi = require("../lib/clientAi");
const clientAi = require("../lib/clientAi");
const data = require("../data/data.json");
const { getMessage } = require("../conrtrollers/chatController");
const router = Router();

router.get("/", getMessage);

module.exports = router;
