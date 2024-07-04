import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mypage-select">
      <button
        onClick={() => navigate("/mypage")}
        style={{
          backgroundColor: location.pathname === "/mypage" ? "black" : "white",
          color: location.pathname === "/mypage" ? "white" : "black",
        }}
      >
        내정보
      </button>
      <button
        onClick={() => navigate("/mypage/ordere")}
        style={{
          backgroundColor:
            location.pathname === "/mypage/ordere" ? "black" : "white",
          color: location.pathname === "/mypage/ordere" ? "white" : "black",
        }}
      >
        주문내역
      </button>
      <button
        onClick={() => navigate("/mypage/review")}
        style={{
          backgroundColor:
            location.pathname === "/mypage/review" ? "black" : "white",
          color: location.pathname === "/mypage/review" ? "white" : "black",
        }}
      >
        리뷰작성
      </button>
    </div>
  );
};

export default Mypage;
