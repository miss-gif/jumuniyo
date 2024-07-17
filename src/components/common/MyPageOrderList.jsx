/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MyPageOrderList = ({ reviewOpenModal, order, isOldOrder }) => {
  const navgate = useNavigate();

  const orderDetails = doneOrderPk => {
    navgate(`../../mypage/order/${doneOrderPk}`);
  };
  return (
    <>
      <div className="order-list-gap">
        <div key={order.doneOrderPk}>
          <div className="order-list">
            <div className="order-date">
              <div>
                {new Date(order.createdAt).toLocaleDateString("ko-KR")} -{" "}
                {order.doneOrderState === 2 ? "취소" : "완료"}
              </div>
              <div
                onClick={() => {
                  orderDetails(order.doneOrderPk);
                }}
              >
                주문상세
              </div>
            </div>
            <div className="order-main">
              <img
                src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
                className="order-logo"
                alt="Order Logo"
              />
              <div className="order-detail-box">
                <div>
                  <div>{order.resName}</div>
                  <div className="order-date">
                    {order.menuInfoDtos[0].menuName} 외{" "}
                    {order.menuInfoDtos.length - 1}개{" "}
                    {order.orderPrice.toLocaleString("ko-KR")}원
                  </div>
                </div>
                {!isOldOrder ? (
                  <button
                    className="btn"
                    onClick={() =>
                      reviewOpenModal(order.doneOrderPk, order.resPk)
                    }
                  >
                    리뷰쓰기
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageOrderList;
