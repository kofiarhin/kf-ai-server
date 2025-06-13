const { Router } = require("express");
const { getQuiz } = require("../conrtrollers/movieQuizController");
const router = Router();

router.get("/", (req, res) => {
  return res.json({
    message: "welcome to the movie quiz app",
    slug: "i generate random quiz based on a movie",
  });
});
router.post("/", getQuiz);

module.exports = router;
