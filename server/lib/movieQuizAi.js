const { Groq } = require("groq-sdk");

// Validate environment variable
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL_NAME = process.env.GROQ_MODEL || "llama3-8b-8192";

const quizAi = async (movie) => {
  const prompt = `
Create a 10-question multiple-choice quiz about the movie ${movie}

Each question must be in strict JSON format:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answer": "string",
  }
]

Do not include any extra text, headers, markdown, or comments. Only return a pure JSON array.
`;

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

    let raw = response.choices[0]?.message?.content?.trim();

    // Clean up markdown formatting if present
    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }

    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err);
    throw new Error(`quizAi failed: ${err.message}`);
  }
};

module.exports = quizAi;
