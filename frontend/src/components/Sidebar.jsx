import React from "react";
import UploadSection from "./UploadSection";
import StatusSection from "./StatusSection";
import ActionSection from "./ActionSection";

function Sidebar({
  onUploadClick,
  fileInputRef,
  onFileChange,
  fileInfo,
  uploadStatus,
  docsCount,
  vectorReady,
  onClear,
}) {
  return (
    <div className="sidebar">
      <UploadSection
        onUploadClick={onUploadClick}
        fileInputRef={fileInputRef}
        onFileChange={onFileChange}
        fileInfo={fileInfo}
        uploadStatus={uploadStatus}
      />
      <StatusSection docsCount={docsCount} vectorReady={vectorReady} />
      <ActionSection onClear={onClear} />
    </div>
  );
}

export default Sidebar;
