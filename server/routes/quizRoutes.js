const { Router } = require("express");
const quizAi = require("../lib/quizAi");

const router = Router();

router.get("/", async (req, res) => {
  const response = await quizAi();

  return res.json({ message: response });
});

module.exports = router;
