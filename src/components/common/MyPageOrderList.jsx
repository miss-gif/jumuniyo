/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const MyPageOrderList = ({ reviewOpenModal, orders }) => {
  const isOlderThanThreeDays = date => {
    const orderDate = new Date(date);
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    return orderDate < threeDaysAgo;
  };

  return (
    <div className="order-list-gap">
      {orders.map(order => {
        const isOldOrder = isOlderThanThreeDays(order.createdAt);
        return (
          <div key={order.doneOrderPk}>
            <div className="order-list">
              <div className="order-date">
                <div>
                  {new Date(order.createdAt).toLocaleDateString("ko-KR")} -{" "}
                  {order.doneOrderState === 2 ? "취소" : "완료"}
                </div>
                <div>주문상세</div>
              </div>
              <div className="order-main">
                <img
                  src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
                  className="order-logo"
                  alt="Order Logo"
                />
                <div className="order-detail-box">
                  <div>
                    <div>롯데리아 대구칠곡구암점</div>
                    <div className="order-date">
                      {order.menuInfoDtos[0].menuName} 외{" "}
                      {order.menuInfoDtos.length - 1}개{" "}
                      {order.orderPrice.toLocaleString("ko-KR")}원
                    </div>
                  </div>
                  {!isOldOrder ? (
                    <button
                      className="btn"
                      onClick={() => {
                        reviewOpenModal();
                      }}
                    >
                      리뷰쓰기
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPageOrderList;
