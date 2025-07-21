import React from "react";

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-avatar">{sender === "user" ? "U" : "A"}</div>
      <div className="message-content">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
