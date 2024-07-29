import React from "react";

const AskDetail = () => {
  return (
    <div className="askDetail-wrap">
      <div className="ask">
        <div className="askTitle">이 쿠폰 어떻게 쓰나요?</div>
        <div className="askWriter">
          <div className="askWriter-tab">작성자</div>
          <div className="askWriter-value">Alpaka1242</div>
        </div>
        <div className="askTime">
          <div className="askTime-tab">작성날짜</div>
          <div className="askTime-value">2024-07-07 13:00</div>
        </div>
      </div>
      <div className="content">
        <div className="askContent">너 없이 못사는 바본대 어쩌라고</div>
        <div className="answerContent">나보다 좋은사람 나타날 때 까지</div>
      </div>
    </div>
  );
};

export default AskDetail;
