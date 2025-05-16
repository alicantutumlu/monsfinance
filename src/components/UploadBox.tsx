import React, { useCallback, useState } from "react";
import { ApiRequest } from "../api";

const UploadBox = ({ formik }: any) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    formik.values.file || null
  );

  const handleUpload = async (file: File) => {
    try {
      const res = await ApiRequest.upload({ file });
      const uploadedUrl = res?.url;
      if (uploadedUrl) {
        formik.setFieldValue("file", uploadedUrl);
        setPreviewUrl(uploadedUrl);
      }
    } catch (error) {
      console.error("Dosya yüklenirken hata:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  return (
    <div className="upload-box mt-4 text-center">
      <label
        htmlFor="fileInput"
        className={`upload-area ${dragActive ? "drag-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Yüklenen Görsel"
            className="uploaded-image"
          />
        ) : (
          <>
            <img src="/agent/upload-file-icon.svg" alt="Upload Icon" />
            <p className="mt-3 text-14-400">Click or Drag image</p>
            {formik.touched.file && formik.errors.file && (
              <div className="text-danger mt-1 text-12">
                {formik.errors.file}
              </div>
            )}
          </>
        )}
        <input
          type="file"
          id="fileInput"
          className="d-none"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default UploadBox;
