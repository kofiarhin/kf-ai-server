const chatAi = require("../lib/chatAi");

const getMessage = async (req, res, next) => {
  const { query } = req.query;
  console.log(query);
  return res.json({ message: "get message" });
};

const createMessage = async (req, res) => {
  const { query } = req.body;
  let chatHistory = [];
  console.log(query);
  const response = await chatAi(query);
  chatHistory.push({ query, response });
  console.log(chatHistory.length);
  return res.json({ message: response });
};

module.exports = {
  getMessage,
  createMessage,
};
