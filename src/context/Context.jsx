import { createContext, useState, useEffect } from "react";
import main from "../Api/gemini";
import { marked } from "marked";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  // Typewriter-specific state
  const [displayedResponse, setDisplayedResponse] = useState(""); 

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAllChats(parsed);
      if (parsed.length > 0) {
        setCurrentChatIndex(parsed.length - 1);
        setShowResult(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(allChats));
  }, [allChats]);

  const typeWriter = (text, callback) => {
    let i = 0;
    setDisplayedResponse(""); // clear previous
    const interval = setInterval(() => {
      setDisplayedResponse((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 20); // speed: 20ms per char
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) return;
    setShowResult(true);
    setLoading(true);

    try {
      const response = await main(prompt);
      const htmlResponse = marked(response);
      const newMessage = { prompt, response: htmlResponse };

      setAllChats((prev) => {
        const updated = [...prev];
        if (currentChatIndex === null) {
          updated.push({ id: Date.now(), messages: [newMessage] });
          setCurrentChatIndex(updated.length - 1);
        } else {
          updated[currentChatIndex].messages.push(newMessage);
        }
        return updated;
      });

      // Typewriter effect চালু করা
      typeWriter(response);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const newChat = () => {
    setAllChats((prev) => [...prev, { id: Date.now(), messages: [] }]);
    setCurrentChatIndex((prev) => (prev === null ? 0 : prev + 1));
    setShowResult(false);
    setDisplayedResponse(""); // clear previous
  };

  const switchChat = (index) => {
    setCurrentChatIndex(index);
    setShowResult(true);

    // যখন chat switch করা হয়, নতুন typewriter এর জন্য response reset
    const lastMsg = allChats[index]?.messages.slice(-1)[0];
    if (lastMsg) {
      typeWriter(lastMsg.response.replace(/<\/?[^>]+(>|$)/g, ""));
    } else {
      setDisplayedResponse("");
    }
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    showResult,
    loading,
    allChats,
    currentChatIndex,
    newChat,
    switchChat,
    displayedResponse, // ✅ এখানে typewriter response যোগ হলো
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
