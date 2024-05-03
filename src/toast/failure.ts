import { toast } from "react-toastify";

export const failure = () =>
  toast.error("Start or destination are not correct", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
