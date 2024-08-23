import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import "./SidebarRight.scss";
import useFollowedCoupons from "../../../hooks/useFollowedCoupons"; // 커스텀 훅을 불러옵니다.
import { useEffect } from "react";
import "./SidebarCoupon.scss";

const CouponListItem = styled.li`
  padding: 15px;
  background-color: #ffffff; /* 항목 배경을 흰색으로 설정 */
  border: 2px solid #00c4bd; /* 버튼과 동일한 테두리 색상 */
  border-radius: 5px; /* 버튼과 동일한 모서리 둥글기 */
  margin-bottom: 10px; /* 항목 사이에 여백 추가 */
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #00c4bd; /* 호버 시 배경색을 오렌지로 */
    border-color: #00c4bd; /* 호버 시 테두리 색상 유지 */
    color: #ffffff; /* 호버 시 텍스트 색상을 흰색으로 */
  }
`;

const SidebarCoupon = ({ isSidebarCoupon, toggleSidebarCoupon }) => {
  const { coupons, loading, fetchFollowedCoupons } = useFollowedCoupons(); // 커스텀 훅 사용
  const navigate = useNavigate();

  useEffect(() => {
    if (isSidebarCoupon) {
      fetchFollowedCoupons(); // 사이드바가 열릴 때만 데이터 로드
    }
  }, [isSidebarCoupon, fetchFollowedCoupons]);

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
                        navigate(`/restaurants/${coupon.resPk}`);
                      }}
                    >
                      <h3 className="coupon-item__title">{coupon.resName}</h3>
                      <p>할인 금액: {coupon.price}원</p>
                      <p>최소 주문 금액: {coupon.minOrderAmount}원</p>
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
