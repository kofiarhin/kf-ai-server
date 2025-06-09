import { useMutation } from "@tanstack/react-query";
import { BASE_URL, DEV_ENV } from "../lib/constants";

const sendMessage = async ({ query, context }) => {
  const prodUrl = `${BASE_URL}/api/chat`;
  const devUrl = "/api/chat";
  const url = DEV_ENV === "development" ? devUrl : prodUrl;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, context }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong while sending the message.");
  }

  const data = await res.json();
  return data.message;
};

const useChatMutation = () => {
  return useMutation({
    mutationFn: sendMessage,
    mutationKey: ["chat"],
    onSuccess: (data) => {
      console.log("AI response:", data);
    },
  });
};

export default useChatMutation;
