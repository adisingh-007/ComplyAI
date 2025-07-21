import React from "react";

function WelcomeMessage() {
  return (
    <div className="welcome-message" id="welcomeMessage">
      <h2 className="welcome-title">Welcome to Tata Steel Document Assistant</h2>
      <p className="welcome-subtitle">
        Upload your technical documents, reports, and manuals to get instant answers with AI-powered document analysis and intelligent search capabilities.
      </p>
      <div className="welcome-features">
        <div className="feature-item">
          <div className="feature-title">Technical Documents</div>
          <div className="feature-description">
            Analyze specifications, reports, and technical manuals with advanced AI processing
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-title">Intelligent Search</div>
          <div className="feature-description">
            Advanced semantic search across all document types for precise information retrieval
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-title">AI-Powered Analysis</div>
          <div className="feature-description">
            Get comprehensive insights and detailed answers from your document collection
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-title">Steel Industry Focus</div>
          <div className="feature-description">
            Specialized for steel production and manufacturing documentation
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeMessage;
