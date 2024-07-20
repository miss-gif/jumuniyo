/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const MyPageOrderList = ({ reviewOpenModal, order, isOldOrder }) => {
  const navigate = useNavigate();

  const orderDetails = doneOrderPk => {
    navigate(`../../mypage/orderclose/${doneOrderPk}`);
  };

  const orderDate = new Date(order.createdAt).toLocaleDateString("ko-KR");
  const orderState = order.doneOrderState === 2 ? "취소" : "완료";
  const orderImage = order.resPic
    ? `https://34.64.63.109/pic${order.resPic}`
    : "https://34.64.63.109/pic/default.png";
  const menuInfo = order.menuInfoDtos[0].menuName;
  const additionalMenus = order.menuInfoDtos.length - 1;
  const totalPrice = order.orderPrice.toLocaleString("ko-KR");

  // console.log("order.doneOrderPk", order.doneOrderPk);

  return (
    <div className="order-list-gap">
      <div className="order-list" key={order.doneOrderPk}>
        <div className="order-date">
          <div>
            {orderDate} - {orderState}
          </div>
          <div
            className="order-detail-text"
            onClick={() => orderDetails(order.doneOrderPk)}
          >
            주문상세
          </div>
        </div>
        <div className="order-main">
          <img
            src={orderImage}
            className="order-logo"
            alt={`Order logo for ${order.resName}`}
          />
          <div className="order-detail-box">
            <div>
              <div>{order.resName}</div>
              <div className="order-date">
                {menuInfo} 외 {additionalMenus}개 {totalPrice}원
              </div>
            </div>
            {!isOldOrder &&
            order.reviewState === 0 &&
            order.doneOrderState === 1 ? (
              <button
                className="btn"
                onClick={() => reviewOpenModal(order.doneOrderPk, order.resPk)}
              >
                리뷰쓰기
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderList;
