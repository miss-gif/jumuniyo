import React from "react";

const OwnerComment = () => {
  return (
    <div className="review__owner-comment owner-comment">
      <div className="owner-comment__header">
        <div className="owner-comment-info">
          <div className="owner-comment__owner">사장님</div>
          <div className="owner-comment__time">7시간 전</div>
        </div>
        <div className="owner-comment__report">신고</div>
      </div>
      <div className="owner-comment__content">
        앞으로도 맛있는것만 드리는 파스토보이가 되겠습니다! 찜 꾸욱 눌러주시고
        또 찾아주세요 감사합니다!💞 #❣파스타 맛집❣ #💚연중무휴 24시간💚 #💞내
        집안 레스토랑💞
      </div>
    </div>
  );
};

export default OwnerComment;
