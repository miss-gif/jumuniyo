import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const useNav = useNavigate("");
  return (
    <div className="mypage-select">
      <button
        onClick={() => {
          useNav("/mypage");
        }}
      >
        내정보
      </button>
      <button
        onClick={() => {
          useNav("/mypage/ordere");
        }}
      >
        주문내역
      </button>
      <button
        onClick={() => {
          useNav("/mypage/review");
        }}
      >
        리뷰작성
      </button>
    </div>
  );
};

export default Mypage;
