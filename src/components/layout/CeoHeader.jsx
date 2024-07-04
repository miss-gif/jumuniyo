import React from "react";

const CeoHeader = () => {
  return (
    <div className="ceo-page__header">
      <h2>주문이요사장님 | 사업장 페이지</h2>
      <div className="ceo-page__controller">
        <div className="ceo-page__user-id">userID</div>
        <button className="ceo-page__button">내정보</button>
        <div className="ceo-page__notification">알림</div>
      </div>
    </div>
  );
};

export default CeoHeader;
