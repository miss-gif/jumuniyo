import React from "react";
import OwnerComment from "./OwnerComment";

const Review = () => {
  return (
    <li className="review">
      <div className="review__header">
        <div className="review__user-info">
          <p className="user-info__id">hy**님</p>
          <p className="user-info__time">9시간 전</p>
        </div>
        <div className="review__report">신고</div>
      </div>
      <div className="review__rating">
        <div className="rating__stars">★★★★★</div>
        <div className="rating__details">
          맛 <span>★</span> 5 양 <span>★</span> 5
        </div>
      </div>
      <img src="https://picsum.photos/100/" alt="" className="review__image" />
      <div className="review__order">
        목살 스테이크 샐러드/1(스테이크 추가([인기]목살 추가),사이드메뉴
        추가([추천]마늘빵 2조각)),우삼겹 필라프/1(맵기 추가 선택(파스토보이
        오리지널),필라프 재료 추가(밥 추가),필라프 재료 추가(우삼겹추가)),베이컨
        까르보나라/1(맵기 추가 선택(파스토보이 오리지널),파스타 재료 추가(면
        추가))
      </div>
      <div className="review__content">
        애들이 일주일에 2번은 시켜달래서 넘 자주 시키네요~ 금방 순삭되어요~다
        먹어버려서,저는 샐러드만 맛볼수 있는ㅜㅜ
      </div>
      <OwnerComment />
    </li>
  );
};

export default Review;
