import React from "react";

function InputArea({ input, setInput, onSend, loading, vectorReady }) {
  return (
    <form className="input-area" onSubmit={onSend}>
      <div className="input-wrapper">
        <div className="input-container">
          <textarea
            className="message-input"
            placeholder={
              vectorReady ? "Ask about your PDF..." : "Upload a PDF to begin"
            }
            rows={1}
            disabled={!vectorReady}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          className="send-button"
          disabled={!input.trim() || !vectorReady || loading}
          type="submit"
          title="Send"
        >
          ➤
        </button>
      </div>
    </form>
  );
}

export default InputArea;
