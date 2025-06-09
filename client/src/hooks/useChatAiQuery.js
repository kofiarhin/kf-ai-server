import { useQuery } from "@tanstack/react-query";
import { BASE_URL, DEV_ENV } from "../lib/constants";

const getMessage = async () => {
  const prodUrl = `${BASE_URL}/api/chat`;
  const devUrl = "/api/chat";
  const url = DEV_ENV === "development" ? devUrl : prodUrl;
  const res = await fetch(url);
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
