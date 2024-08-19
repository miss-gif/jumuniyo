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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <ul>
          <li className="nav__item" onClick={toggleSidebarCart}>
            <>
              {items.length > 0 ? (
                <ul className="cart-page__list">
                  {items.map(item => (
                    <CartListItem key={item.menu_pk}>
                      <h3 className="cart-item__title">{item.menu_name}</h3>
                      <p>수량: {item.quantity}</p>
                      <p>가격: {item.price}원</p>
                      <div className="cart-item__actions">
                        <button
                          onClick={() =>
                            dispatch(increaseQuantity(item.menu_pk))
                          }
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch(decreaseQuantity(item.menu_pk))
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          onClick={() => dispatch(removeItem(item.menu_pk))}
                        >
                          삭제
                        </button>
                      </div>
                    </CartListItem>
                  ))}
                </ul>
              ) : (
                <div className="result__zero">장바구니가 비었습니다.</div>
              )}
            </>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarCart;
