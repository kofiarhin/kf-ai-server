const { Router } = require("express");

const router = Router();

router.get("/character", async (req, res) => {
  return res.json({ mesage: "get character details" });
});
module.exports = router;
