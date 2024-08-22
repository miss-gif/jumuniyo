import { useEffect } from "react";

const usePortOne = () => {
  useEffect(() => {
    const loadPortOne = () => {
      if (!window.PortOne) {
        const script = document.createElement("script");
        script.src = "https://cdn.portone.io/v2/browser-sdk.js";
        script.onload = () => console.log("PortOne SDK 로드 완료");
        script.onerror = () => console.error("PortOne SDK 로드 오류");
        document.body.appendChild(script);
      }
    };
    loadPortOne();
  }, []);
};

export default usePortOne;
