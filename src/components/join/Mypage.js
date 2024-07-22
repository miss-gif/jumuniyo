import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLogin = getCookie("accessToken");
    if (!isLogin) {
      setIsLogin(false);
      return;
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="mypage-select">
      <button
        onClick={() => navigate("/mypage")}
        style={{
          backgroundColor: location.pathname === "/mypage" ? "#333" : "white",
          color: location.pathname === "/mypage" ? "white" : "#333",
        }}
      >
        내정보
      </button>
      <button
        onClick={() => navigate("/mypage/address")}
        style={{
          backgroundColor:
            location.pathname === "/mypage/address" ? "#333" : "white",
          color: location.pathname === "/mypage/address" ? "white" : "#333",
        }}
      >
        내주소
      </button>
      <button
        onClick={() => navigate("/mypage/ordere")}
        style={{
          backgroundColor:
            location.pathname === "/mypage/ordere" ||
            location.pathname === "/mypage/orderclose"
              ? "#333"
              : "white",
          color:
            location.pathname === "/mypage/ordere" ||
            location.pathname === "/mypage/orderclose"
              ? "white"
              : "#333",
        }}
      >
        주문내역
      </button>
      <button
        onClick={() => navigate("/mypage/review")}
        style={{
          backgroundColor:
            location.pathname === "/mypage/review" ? "#333" : "white",
          color: location.pathname === "/mypage/review" ? "white" : "#333",
        }}
      >
        리뷰내역
      </button>
      {!isLogin ? null : (
        <button
          onClick={() => navigate("/mypage/withdrawal")}
          style={{
            backgroundColor:
              location.pathname === "/mypage/withdrawal" ? "#333" : "white",
            color:
              location.pathname === "/mypage/withdrawal" ? "white" : "#333",
          }}
        >
          회원탈퇴
        </button>
      )}
    </div>
  );
};

export default Mypage;
