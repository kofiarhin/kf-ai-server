import { useMutation } from "@tanstack/react-query";

const sendMessage = async (query) => {
  const res = await fetch("/api/chat", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data.message;
};

const useChatMutation = () => {
  return useMutation({
    mutationFn: (query) => sendMessage(query),
    mutationKey: (query) => ["chat", query], // <-- optional: only if you really need dynamic keys
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useChatMutation;
