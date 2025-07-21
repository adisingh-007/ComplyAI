import React from "react";

function UploadSection({
  onUploadClick,
  fileInputRef,
  onFileChange,
  fileInfo,
  uploadStatus,
}) {
  return (
    <div className="sidebar-section">
      <h3>Upload Document</h3>
      <div
        className="file-upload-area"
        onClick={onUploadClick}
        style={{ cursor: "pointer" }}
      >
        <div className="file-upload-text">
          Drop PDF here or click to browse
        </div>
        <div className="file-upload-subtext">Supports PDF files</div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
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
  );
}

export default UploadSection;
