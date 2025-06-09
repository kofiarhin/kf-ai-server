import { useQuery } from "@tanstack/react-query";

const getMessage = async () => {
  const res = await fetch("/api/chat");
  const data = await res.json();
  return data;
};

const useChatAiQuery = () => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: getMessage,
  });
};

export default useChatAiQuery;
