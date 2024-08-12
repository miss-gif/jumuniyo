import React, { useEffect, useState } from "react";
import Mypage from "../components/join/Mypage";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";
import { useNavigate } from "react-router-dom";

interface Coupon {
  content: string;
  couponId: number;
  id: number;
  minOrderAmount: number;
  name: string;
  price: number;
  resName: string;
}

const MyPageCouponPage = () => {
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const navigate = useNavigate();

  const getCoupon = async () => {
    try {
      const res = await jwtAxios.get("/api/coupons/user");
      setCouponList(res.data.resultData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  useEffect(() => {
    getCoupon();
  }, []);

  useEffect(() => {
    console.log(couponList);
  }, [couponList]);

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <h3>보유중인 쿠폰 리스트</h3>
        {couponList && couponList.length > 0 ? (
          <div className="order-list-gap">
            {couponList.map(couponList => (
              <div key={couponList.couponId}>
                <div className="order-list">
                  <div className="order-date">
                    <div className="flex-between-real-box">
                      <div>
                        <div>{couponList.resName}</div>
                      </div>
                      <button
                        className="btn"
                        onClick={() => {
                          //수정해야함
                          navigate(`/restaurants/1`);
                        }}
                      >
                        주문하러 가기
                      </button>
                    </div>
                  </div>
                  <div className="flex-between-real-box">
                    <div className="order-main">
                      {/* {!couponList.restaurantPic ? (
                        <img
                          src={"/images/defaultRes.png"}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      ) : (
                        <img
                          src={`/pic${couponList.restaurantPic}`}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      )} */}
                      <div>쿠폰금액: {couponList.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyPageCouponPage;
