import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SidebarRight.scss";

const CouponListItem = styled.li`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SidebarCoupon = ({ isSidebarCoupon, toggleSidebarCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const accessToken = useSelector(state => state.user.accessToken);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/coupons/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.statusCode === 1) {
          setCoupons(response.data.resultData);
        } else {
          console.error("API 응답 오류:", response.data.resultMsg);
        }
      } catch (error) {
        console.error("쿠폰 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    if (isLoggedIn) {
      fetchCoupons();
    }
  }, [isLoggedIn, accessToken, coupons]);

  return (
    <div
      className={`sidebar-right-overlay ${isSidebarCoupon ? "visible" : ""}`}
      onClick={toggleSidebarCoupon}
    >
      <div
        className={`sidebar-right ${isSidebarCoupon ? "open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <h2>쿠폰 목록</h2>
        <ul>
          <li className="nav__item" onClick={toggleSidebarCoupon}>
            <>
              {coupons.length > 0 ? (
                <ul className="coupons-page__list">
                  {coupons.map(coupon => (
                    <CouponListItem
                      key={coupon.id}
                      onClick={() => {
                        // 쿠폰 사용 시 관련 페이지로 이동
                        navigate(`/restaurants/${coupon.couponId}`);
                      }}
                    >
                      <h3 className="coupon-item__title">{coupon.name}</h3>
                      <p>{coupon.content}</p>
                      <p>할인 금액: {coupon.price}원</p>
                      <p>최소 주문 금액: {coupon.minOrderAmount}원</p>
                      <p>상점 이름: {coupon.resName}</p>
                    </CouponListItem>
                  ))}
                </ul>
              ) : (
                <div className="result__zero">쿠폰 목록이 없습니다.</div>
              )}
            </>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarCoupon;
