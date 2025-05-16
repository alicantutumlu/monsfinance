import { toast } from "react-toastify";

export const CustomToast = (status: any, message: any): any => {
  const commonOptions: any = {
    position: "bottom-center",
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    autoClose: 6000,
    icon: false,
    style: {
      backgroundColor: "#333",
      color: "#fff",
      fontSize: "14px",
      borderRadius: "8px",
      padding: "10px 20px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
    },
  };

  if (status === "success") {
    toast.success(message, {
      ...commonOptions,
      style: {
        ...commonOptions.style,
        backgroundColor: "rgb(39,167,69 ,0.5)",
        color: "#fff",
      },
    });
  } else {
    toast.error(message, {
      ...commonOptions,
      style: {
        ...commonOptions.style,
        backgroundColor: "rgb(220,52,69,0.5)",
        color: "#fff",
      },
    });
  }
};

export default CustomToast;
