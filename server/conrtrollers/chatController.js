const chatAi = require("../lib/chatAi");

const getMessage = async (req, res, next) => {
  const { query } = req.query;
  return res.json({ message: "get message" });
};

const createMessage = async (req, res) => {
  const { query, context } = req.body;
  const response = await chatAi(query, context);
  return res.json({ message: response });
};

module.exports = {
  getMessage,
  createMessage,
};
