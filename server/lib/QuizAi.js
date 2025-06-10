const { Groq } = require("groq-sdk");

// Validate environment variable
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Configurable model
const MODEL_NAME = process.env.GROQ_MODEL || "llama3-8b-8192";

const movieAi = async ({ character }) => {
  console.log(character);
  // Validate input
  if (!character || typeof character !== "string") {
    throw new Error("Invalid character input");
  }

  const prompt = `Write a character bio for ${character}. Include their profession, when they started, their breakout role, major achievements, recent work, and any awards. Keep it under 200 words and structured like a professional actor biography.`;

  try {
    const response = await groq.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return response.choices[0]?.message?.content || "";
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err);
    throw new Error(`callGroqAPI failed: ${err.message}`);
  }
};

module.exports = movieAi;
