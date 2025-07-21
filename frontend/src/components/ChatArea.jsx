import React from "react";
import Messages from "./Messages";
import InputArea from "./InputArea";
import Loading from "./Loading";

function ChatArea({
  messages,
  input,
  setInput,
  onSend,
  loading,
  vectorReady,
}) {
  return (
    <div className="chat-area">
      <Messages messages={messages} />
      {loading && <Loading />}
      <InputArea
        input={input}
        setInput={setInput}
        onSend={onSend}
        loading={loading}
        vectorReady={vectorReady}
      />
    </div>
  );
}

export default ChatArea;
