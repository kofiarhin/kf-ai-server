import Header from "@/components/Header/Header";
import Home from "@/Pages/Home/Home";
import useChatAiQuery from "@/hooks/useChatAiQuery";

const App = () => {
  const query = "what is your name";
  const { data } = useChatAiQuery(query);
  console.log(data);
  return (
    <div>
      <Header />
      <Home />
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
