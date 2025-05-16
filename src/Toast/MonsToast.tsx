import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const MonsToast = (status: string, message: string, theme: string) => {
  if (status === "success") {
    toast.success(message, {
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: theme,
      autoClose: 3000,
      icon: false,
      className: "toast-success-container-after",
      progressClassName: "progress-bar-style",
    });
  } else {
    toast.error(message, {
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: theme,
      autoClose: 3000,
      icon: false,
      className: "toast-error-container-after",
      progressClassName: "progress-bar-style",
    });
  }
};

export default MonsToast;
