const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: "1024x1024",
          response_format: "url",
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("GROQ Error:", errorDetails);
      return res
        .status(500)
        .json({ error: "Failed to generate image from Groq" });
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    res.json({ imageUrl });
  } catch (error) {
    console.error("Fetch failed:", error.message);
    res.status(500).json({ error: "Server error during image generation" });
  }
});

module.exports = router;
