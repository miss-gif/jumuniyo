import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = ({ type, text }) => {
  switch (type) {
    case "default":
      toast(text);
      break;
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "error":
      toast.error(text);
      break;
    default:
      toast(text); // 기본값 처리
      break;
  }
};

const ToastManager = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={true} // 남은 시간 표시 off
      newestOnTop={false} // 쌓임 순서
      closeOnClick // 클릭 시 닫힘
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastManager;
export { toast };
