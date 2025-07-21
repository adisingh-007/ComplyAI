import React from "react";

function Loading() {
  return (
    <div className="loading show" id="loading">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Processing your request...</div>
    </div>
  );
}

export default Loading;
