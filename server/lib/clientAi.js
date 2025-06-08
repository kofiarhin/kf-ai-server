const { Groq } = require("groq-sdk");
const data = require("..//data/data.json");

// Validate environment variable
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Configurable model
const MODEL_NAME = process.env.GROQ_MODEL || "llama3-8b-8192";

const clientAi = async () => {
  const dataStr = JSON.stringify(data);
  const prompt = `
You are a helpful AI assistant embedded in a chat app.

Knowledge Base:
${dataStr}

User Query:
"when are you available for work?"

Respond based only on the knowledge base. Do not invent information. If the answer is not available, reply: "I'm sorry, I don't have that information."

Answer in the first person as if you're the product or persona described in the knowledge base.
`.trim();

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

module.exports = clientAi;
