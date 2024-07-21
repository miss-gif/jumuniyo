import React from "react";
import ToastManager, { notify } from "../components/common/ToastManager";

const Test = () => {
  const handleClick = () => {
    notify({ type: "default", text: "텍스트입니다!" });
  };

  return (
    <div>
      <button onClick={handleClick}>버튼</button>
      <ToastManager />
    </div>
  );
};

export default Test;
