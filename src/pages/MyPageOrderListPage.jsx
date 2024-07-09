import { useState } from "react";
import MyPageOrderList from "../components/common/MyPageOrderList";
import Mypage from "../components/join/Mypage";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";

const MyPageOrderListPage = () => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const reviewOpenModal = () => {
    setReviewOpen(true);
  };

  const reviewYes = () => {
    setReviewOpen(false);
  };

  const reviewNo = () => {
    setReviewOpen(false);
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <MyPageOrderList reviewOpenModal={reviewOpenModal} />
        {reviewOpen ? (
          <MypageReviewWrite reviewYes={reviewYes} reviewNo={reviewNo} />
        ) : null}
      </div>
    </div>
  );
};

export default MyPageOrderListPage;
