const sanitize = (str = "") => str.replace(/[\r\n]+/g, " ").trim();

const generatePrompt = (query = "", dataStr = "", context = []) => {
  const cleanQuery = sanitize(query);
  const cleanData = sanitize(dataStr);

  const formattedContext = context
    .map((entry) => `User: ${sanitize(entry.user)}\nYou: ${sanitize(entry.ai)}`)
    .join("\n\n");

  const introRule =
    context.length === 0
      ? "You may briefly introduce yourself if it fits naturally."
      : "Do not introduce or repeat your name or identity.";

  const prompt = `
You are a helpful assistant named Kofi Ayan Adadwa in a chat app. Below is everything you know about yourself:

---
${cleanData}
---

Here’s the chat so far:

${formattedContext}

Now continue the conversation. Respond casually, directly, and in **first person** — like you're talking to a friend.

${introRule}  
Only answer using the knowledge above.  
If you're unsure, say: “I'm not sure about that.”

If the user asks for links, embed them using valid HTML like this:  
<a href="https://example.com" target="_blank">Link Text</a>  
Never return raw URLs, file names, or years — always use anchor tags.

User: ${cleanQuery}  
You:`.trim();

  return prompt;
};

module.exports = {
  generatePrompt,
};
