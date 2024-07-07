// eslint-disable-next-line react/prop-types
const MyPageOrderList = ({ reviewOpenModal }) => {
  return (
    <div className="order-list">
      <div className="order-date">
        <div>7월 3일 - 배달완료</div>
        <div>주문상세</div>
      </div>
      <div className="order-main">
        <img
          src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
          className="order-logo"
        ></img>
        <div className="order-detail-box">
          <div>
            <div>롯데리아 대구칠곡구암점</div>
            <div className="order-date">T REX세트 외 2개 16,100원</div>
          </div>
          <button
            className="btn"
            onClick={() => {
              reviewOpenModal();
            }}
          >
            리뷰쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderList;
