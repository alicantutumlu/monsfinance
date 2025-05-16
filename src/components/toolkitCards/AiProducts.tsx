import React from "react";
import Input from "../Input";
export const AiProducts = () => {
  return (
    <div className="toolkit-card">
      <div className="">
        <p className="toolkit-main-title">AI Connect</p>
        <hr className="custom-line mb-4" />
        <div className="d-flex justify-content-center">
          <img className="image-setting" src="/images/deepseek.png" alt="" />
        </div>

        <div className="mt-4 ">
          <p className="toolkit-main-text mb-2">Api Key</p>
          <input className="form-control toolkit" type="text" />
        </div>
      </div>
    </div>
  );
};
