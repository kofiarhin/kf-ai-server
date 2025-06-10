const { Router } = require("express");
const baseAi = require("../lib/baseAi");

const router = Router();

router.get("/", async (req, res) => {
  const response = await baseAi();

  return res.json({ message: response });
});

module.exports = router;
