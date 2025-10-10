import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    showResult,
    loading,
    allChats,
    currentChatIndex,
    input,
    setInput,
  } = useContext(Context);

  // ✅ এখন চলমান chat ধরো
  const currentChat =
    currentChatIndex !== null ? allChats[currentChatIndex].messages : [];

  const handleSubmit = () => {
    if (input.trim()) {
      onSent(input);
    }
  };

  return (
    <div className="main">
      {/* Top Section */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      {/* Chat / Default View */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Raufur.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Explain React hooks in simple terms</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggest content ideas for dropshipping store</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Write an Instagram ad copy using human psychology</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me debug my React code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {/* ✅ এখন এখানে চলমান chat দেখাবে */}
            {currentChat.map((item, index) => (
              <div key={index} className="message">
                <div className="user-message">
                  <img src={assets.user_icon} alt="user" />
                  <p>{item.prompt}</p>
                </div>
                <div className="ai-message">
                  <img src={assets.gemini_icon} alt="gemini" />
                  <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            )}
          </div>
        )}

        {/* Input Box */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && (
                <img
                  src={assets.send_icon}
                  alt="send"
                  onClick={handleSubmit}
                  className="send-btn"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
