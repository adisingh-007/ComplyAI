import React from "react";

function ActionSection({ onClear }) {
  return (
    <div className="sidebar-section">
      <h3>Actions</h3>
      <button className="clear-button" onClick={onClear}>
        Clear All Documents
      </button>
    </div>
  );
}

export default ActionSection;
