import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { allChats, newChat, switchChat } = useContext(Context);

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />

        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {allChats.length === 0 ? (
              <p className="no-history">No recent chats</p>
            ) : (
              allChats.map((chat, index) => (
                <div
                  key={chat.id}
                  className="recent-entry"
                  onClick={() => switchChat(index)}
                >
                  <img src={assets.message_icon} alt="msg" />
                  <p>
                    {chat.messages[0]?.prompt
                      ? chat.messages[0].prompt.slice(0, 25)
                      : "New chat..."}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history" />
          {extended && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
