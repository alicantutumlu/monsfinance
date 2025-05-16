import React, { useState } from "react";
import Input from "../Input";
export const DocumentUpload = () => {
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };
  return (
    <div className="toolkit-card">
      <div className="">
        <p className="toolkit-main-title">Upload OHLC File</p>
        <hr className="custom-line mb-4" />

        <div className="mt-4 ">
          <p className="toolkit-main-text mb-2">Upload</p>
          {!file && (
            <div
              className="border border-white p-4 rounded drag-drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <p className="toolkit-main-text mb-2">
                Drag & Drop your file here or
              </p>
              <label className="btn mainButton px-3 py-2">
                <p className="toolkit-main-text">Browse</p>
                <input
                  type="file"
                  accept=".pdf,.xls,.xlsx,.csv,.txt"
                  onChange={handleFileChange}
                  className="d-none"
                />
              </label>
            </div>
          )}

          {file && (
            <div className="border border-white p-4 rounded drag-drop-area">
              <p className="toolkit-main-text mb-1">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
              <button className="btn btn-danger btn-sm" onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
