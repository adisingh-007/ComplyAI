import React from "react";

function StatusSection({ docsCount, vectorReady }) {
  return (
    <div className="sidebar-section">
      <h3>System Status</h3>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Documents</span>
          <span className="stat-value">{docsCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Vector Store</span>
          <span className="stat-value">
            {vectorReady ? "Ready" : "Not Ready"}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">RAG Chain</span>
          <span className="stat-value">
            {vectorReady ? "Ready" : "Not Ready"}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">AI Model</span>
          <span className="stat-value">Advanced NLP</span>
        </div>
      </div>
    </div>
  );
}

export default StatusSection;

