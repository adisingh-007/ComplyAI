import React from "react";
import Message from "./Message";
import WelcomeMessage from "./WelcomeMessage";

function Messages({ messages }) {
  return (
    <div className="messages" id="messages">
      {messages.length === 0 ? <WelcomeMessage /> : null}
      {messages.map((msg, i) => (
        <Message key={i} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default Messages;
