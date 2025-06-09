import useChatAiQuery from "@/hooks/useChatAiQuery";
import "./chat.styles.scss";
import { useState } from "react";
import useChatMutation from "../../hooks/useChatMutation";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { data: welcomeData, isLoading: welcomeIsLoading } = useChatAiQuery();
  const { mutate, data: chatData, isLoading } = useChatMutation();

  console.log(chatHistory);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    mutate(
      { query: inputMessage, context: chatHistory },
      {
        onSuccess: (data) => {
          setInputMessage(""); // clear only after successful mutation
          setChatHistory((prev) => {
            return [...prev, { user: inputMessage, system: data }];
          });
        },
      }
    );
  };

  return (
    <div id="chat">
      <div className="message-wrapper">
        {chatData ? <p>{chatData}</p> : <p>Thinking.... </p>}
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type message here"
            value={inputMessage} // ✅ fixed typo here
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
