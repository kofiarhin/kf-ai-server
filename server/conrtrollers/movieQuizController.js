const movieQuizAi = require("../lib/movieQuizAi");

const getQuiz = async (req, res) => {
  try {
    const { movie } = req.body;
    if (!movie) {
      return res.status(400).json({ error: "movie title is required" });
    }
    const response = await movieQuizAi(movie);
    return res.json({ message: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).jsoh({ error: error.message });
  }
};

module.exports = {
  getQuiz,
};
