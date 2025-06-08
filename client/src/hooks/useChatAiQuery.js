import { useQuery } from "@tanstack/react-query";

const getMessage = async (query) => {
  try {
    const res = await fetch(`/api/client?query=${query}`);

    if (!res.ok) {
      throw new Error("somethig went wrong");
    }
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error.message);
  }
};

const useChatAiQuery = (query) => {
  return useQuery({
    queryKey: ["message", query],
    queryFn: () => getMessage(),
    enabled: !!query,
  });
};

export default useChatAiQuery;
