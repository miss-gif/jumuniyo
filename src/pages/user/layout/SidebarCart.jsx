import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../../app/cartSlice"; // 액션 임포트
import "./SidebarRight.scss";

const CartListItem = styled.li`
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SidebarCart = ({ isSidebarCart, toggleSidebarCart }) => {
  const items = useSelector(state => state.cart.items); // Redux에서 items 가져오기
  const restaurant = useSelector(state => state.cart.restaurant); // 현재 레스토랑 정보 가져오기
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 총 결제 금액 계산
  const totalAmount = items.reduce(
    (sum, item) =>
      sum +
      item.menu_price * item.quantity +
      (item.selectedOptions
        ? Object.values(item.selectedOptions).reduce(
            (optionSum, option) => optionSum + option.optionPrice,
            0,
          ) * item.quantity
        : 0),
    0,
  );

  const formatPrice = price => price.toLocaleString();

  const handleAddMenuClick = () => {
    navigate(`/restaurants/${restaurant.restaurantPk}`);
    toggleSidebarCart(); // 사이드바 닫기
  };
  const handlePaymentLink = () => {
    navigate(`/payment/${restaurant.restaurantPk}`);
    toggleSidebarCart(); // 사이드바 닫기
  };

  return (
    <div
      className={`sidebar-right-overlay ${isSidebarCart ? "visible" : ""}`}
      onClick={toggleSidebarCart}
    >
      <div
        className={`sidebar-right ${isSidebarCart ? "open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <h2>장바구니 목록</h2>
        {items.length > 0 ? (
          <>
            <ul className="cart-page__list">
              {items.map(item => (
                <CartListItem key={item.menu_pk}>
                  <h3 className="cart-item__title">{item.menu_name}</h3>
                  <p>{item.menu_content}</p>
                  {item.selectedOptions && (
                    <div className="cart-item__options">
                      {Object.entries(item.selectedOptions).map(
                        ([optionPk, option]) => (
                          <div key={optionPk}>
                            {option.optionName}: +
                            {formatPrice(option.optionPrice)}원
                          </div>
                        ),
                      )}
                    </div>
                  )}
                  <p>수량: {item.quantity}</p>
                  <p>
                    가격:
                    {formatPrice(
                      item.menu_price +
                        (item.selectedOptions
                          ? Object.values(item.selectedOptions).reduce(
                              (optionSum, option) =>
                                optionSum + option.optionPrice,
                              0,
                            )
                          : 0),
                    )}
                    원
                  </p>
                </CartListItem>
              ))}
            </ul>
            <div className="sidebar-cart__total-amount">
              <p>총 결제 금액: {formatPrice(totalAmount)}원</p>
            </div>
            <div className="버튼그룹">
              <button className="add-menu-button" onClick={handleAddMenuClick}>
                메뉴 추가하기
              </button>
              <button className="add-menu-button" onClick={handlePaymentLink}>
                결제하기
              </button>
            </div>
          </>
        ) : (
          <div className="result__zero">장바구니가 비었습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SidebarCart;
