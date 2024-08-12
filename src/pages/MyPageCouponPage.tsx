import React, { useEffect } from "react";
import Mypage from "../components/join/Mypage";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";

const MyPageCouponPage = () => {
  const getCoupon = async () => {
    try {
      const res = await jwtAxios.get("/api/coupons/user");
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  useEffect(() => {
    console.log(getCoupon());
  }, []);
  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">안녕</div>
    </div>
  );
};

export default MyPageCouponPage;
