const { Router } = require("express");
const { getQuiz } = require("../conrtrollers/movieQuizController");
const router = Router();

router.post("/", getQuiz);

module.exports = router;
