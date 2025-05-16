import React from "react";

export const Dropbox = ({ inputValue, title, formik, value }: any) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        formik.setFieldValue(value, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {title && <p className="thick16 w300 trText py-2">{title}</p>}
      {inputValue !== "" ? (
        <label htmlFor="fileInput" className="dropbox">
          <img width={100} height={100} src={inputValue} alt="" />
          <input
            onChange={handleFileChange}
            id="fileInput"
            type="file"
            style={{ display: "none" }}
          />
        </label>
      ) : (
        <label htmlFor="fileInput" className="dropbox">
          <img src="/icons/dropbox.svg" alt="" />
          <p className="thick16 trText w300">
            Click to upload or drag and drop
          </p>
          <p className="thin12">Max file size 30mb</p>
          <input
            onChange={handleFileChange}
            id="fileInput"
            type="file"
            style={{ display: "none" }}
          />
        </label>
      )}
    </>
  );
};

export default Dropbox;
