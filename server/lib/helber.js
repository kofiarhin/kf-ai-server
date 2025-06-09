const kb = require("../data/kb.json");
const sanitize = (str) => str.replace(/[\r\n]+/g, " ").trim();

const generatePrompt = (query, dataStr) => {
  const cleanQuery = sanitize(query);
  const cleanData = dataStr.trim();

  const prompt = `
You are a helpful assistant in a chat app. Below is everything you know about yourself:

---
${cleanData}
---

Only respond based on that information. If the answer isn’t in the knowledge base, reply: “I'm not sure about that.”

Speak casually, like you're chatting with a friend. Always answer in the **first person**, as if you are the person or product described.

User: ${cleanQuery}  
You:
`.trim();

  return prompt;
};

module.exports = {
  generatePrompt,
};
