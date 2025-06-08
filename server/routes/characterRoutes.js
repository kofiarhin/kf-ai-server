const { Router } = require("express");
const movieAi = require("../lib/movieAi");

const router = Router();

router.get("/:character", async (req, res) => {
  const { character } = req.params;
  const response = await movieAi({ character });
  return res.json({ message: response });
});
module.exports = router;
