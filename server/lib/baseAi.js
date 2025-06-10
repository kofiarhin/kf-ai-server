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

const baseAi = async () => {
  const prompt = `Create a 5-question multiple-choice quiz about react
Each question must have 4 options and clearly marked correct answers.
Include an explanation for each answer.
Output JSON format.`;

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

module.exports = baseAi;
