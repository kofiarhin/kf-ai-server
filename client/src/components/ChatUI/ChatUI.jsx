import React, { useState, useEffect } from "react";
import "./ChatUI.scss";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How are you doing today?",
      sender: "bot",
      time: "10:00 AM",
    },
    {
      text: "I'm doing great, thanks for asking!",
      sender: "user",
      time: "10:01 AM",
    },
    {
      text: "What can I assist you with today?",
      sender: "bot",
      time: "10:02 AM",
    },
    {
      text: "I have a question about using this chat interface.",
      sender: "user",
      time: "10:03 AM",
    },
    {
      text: "Of course! I'm here to help. What would you like to know?",
      sender: "bot",
      time: "10:04 AM",
    },
    {
      text: "How can I format my messages with different styles?",
      sender: "user",
      time: "10:05 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([...messages, { text: newMessage, sender: "user", time: now }]);
    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = "I'm a bot, here's a default reply.";
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { text: reply, sender: "bot", time: replyTime },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chat-ui">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            <div className="message">
              <p>{msg.text}</p>
              <span className="timestamp">{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-row bot">
            <div className="message typing-indicator">
              <span>Typing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
