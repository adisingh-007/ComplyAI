import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">TS</div>
        <div>
          <div className="title">Tata Steel Document Assistant</div>
          <div className="subtitle">Intelligent Document Analysis & Query System</div>
        </div>
      </div>
      <div className="header-right">
        <div className="status-indicator">
          <div className="status-dot" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
