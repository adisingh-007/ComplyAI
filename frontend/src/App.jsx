import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const BACKEND_URL = "http://localhost:5000";

export default function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [vectorReady, setVectorReady] = useState(false);
  const [docsCount, setDocsCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus("Uploading...");
    setVectorReady(false);
    setFileInfo(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedFile(file);
        setFileInfo({ name: file.name, size: file.size });
        setFilename(data.filename);
        setUploadStatus("Uploaded!");
        setVectorReady(true);
        setDocsCount(1);
      } else {
        setUploadStatus("Upload failed: " + (data.error || "Unknown error"));
        setUploadedFile(null);
        setVectorReady(false);
        setDocsCount(0);
      }
    } catch (err) {
      setUploadStatus("Network error");
    }
  }

  function handleUploadClick() {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !vectorReady || !filename) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text, sources: [] },
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, question: text }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "assistant",
          text: data.answer || data.error || "Error: No answer returned.",
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: "Network or server error...", sources: [] },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setUploadedFile(null);
    setFileInfo(null);
    setFilename("");
    setUploadStatus("");
    setVectorReady(false);
    setDocsCount(0);
    setMessages([]);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <div className="logo">A</div>
          <div>
            <div className="title">Assistant</div>
            <div className="subtitle">AI-powered policy and document search</div>
          </div>
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <div className="status-dot" />
            <span>Ready</span>
          </div>
        </div>
      </div>
      <div className="main-content">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Upload Document</h3>
            <div className="file-upload-area" onClick={handleUploadClick} style={{ cursor: "pointer" }}>
              <div className="file-upload-text">Drop PDF here or click to browse</div>
              <div className="file-upload-subtext">Supports PDF files</div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
              />
            </div>
            {fileInfo && (
              <div className="file-info">
                <div className="file-info-name">{fileInfo.name}</div>
                <div className="file-info-size">
                  {(fileInfo.size / 1024).toFixed(1)} KB
                </div>
              </div>
            )}
            {uploadStatus && (
              <div className="status-message success" style={{ marginTop: 12 }}>
                {uploadStatus}
              </div>
            )}
          </div>
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
          <div className="sidebar-section">
            <h3>Actions</h3>
            <button className="clear-button" onClick={handleClear}>
              Clear All Documents
            </button>
          </div>
        </div>
        {/* CHAT AREA */}
        <div className="chat-area">
          <div className="messages" id="messages">
            {messages.length === 0 ? (
              <div className="welcome-message" id="welcomeMessage">
                <h2 className="welcome-title">Welcome to Assistant</h2>
                <p className="welcome-subtitle">
                  Upload your company guidelines and search policies, HR procedures, and more with AI-powered analysis. Results cite the page/section for every answer.
                </p>
              </div>
            ) : null}
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === "user" ? "U" : "A"}
                </div>
                <div className="message-content">
                  {msg.sender === "assistant"
                    ? <ReactMarkdown>{msg.text}</ReactMarkdown>
                    : <p>{msg.text}</p>
                  }
                  {/* Sources for assistant */}
                  {msg.sender === "assistant" && msg.sources && msg.sources.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <b>References used:</b>
                      <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                        {msg.sources.map((src, idx) => (
                          <li key={idx} style={{ fontSize: "12px", color: "#777" }}>
                            {src.section && <span><b>Section:</b> {src.section} </span>}
                            {src.page && <span><b>Page:</b> {src.page}. </span>}
                            <span><b>Excerpt:</b> {src.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {loading && (
            <div className="loading show" id="loading">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>Processing your request...</div>
            </div>
          )}
          {/* Input Area */}
          <form className="input-area" onSubmit={handleSend}>
            <div className="input-wrapper">
              <div className="input-container">
                <textarea
                  className="message-input"
                  placeholder={
                    vectorReady
                      ? "Ask about your guidelines..."
                      : "Upload a PDF to begin"
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
        </div>
      </div>
    </div>
  );
}
