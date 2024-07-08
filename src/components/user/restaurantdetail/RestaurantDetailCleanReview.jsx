import React from "react";
// import "./RestaurantDetailCleanReview.scss";

const RestaurantDetailCleanReview = () => {
  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail__overall-score">
        <div className="overall-score">
          <div className="overall-score__value">4.8</div>
          <div className="overall-score__icon">★★★★★</div>
        </div>
        <div className="score-items">
          <div className="score-item score-item--taste">
            <div className="score-item__title">맛</div>
            <div className="score-item__icon">★★★★★</div>
            <div className="score-item__value">4.8</div>
          </div>
          <div className="score-item score-item--quantity">
            <div className="score-item__title">양</div>
            <div className="score-item__icon">★★★★★</div>
            <div className="score-item__value">4.8</div>
          </div>
          <div className="score-item score-item--delivery">
            <div className="score-item__title">배달</div>
            <div className="score-item__icon">★★★★★</div>
            <div className="score-item__value">4.8</div>
          </div>
        </div>
      </div>

      <div className="review-list">
        <div className="review-list__filter">
          <div className="filter__text">
            <p>
              리뷰 <span>10861개</span>
            </p>
            <p>
              사장님댓글 <span>10861개</span>
            </p>
          </div>
          <div className="filter__photo-reviews">사진리뷰만</div>
        </div>
        <ul className="reviews">
          <li className="review">
            <div className="review__header">
              <div className="review__user-info">
                <div className="user-info__id">hy**님</div>
                <div className="user-info__time">9시간 전</div>
              </div>
              <div className="review__report">신고</div>
            </div>
            <div className="review__rating">
              <div className="rating__stars">★★★★★</div>
              <div className="rating__details">맛 ★ 5 양 ★ 5</div>
            </div>
            <div className="review__order">
              목살 스테이크 샐러드/1(스테이크 추가([인기]목살 추가),사이드메뉴
              추가([추천]마늘빵 2조각)),우삼겹 필라프/1(맵기 추가
              선택(파스토보이 오리지널),필라프 재료 추가(밥 추가),필라프 재료
              추가(우삼겹추가)),베이컨 까르보나라/1(맵기 추가 선택(파스토보이
              오리지널),파스타 재료 추가(면 추가))
            </div>
            <div className="review__content">
              애들이 일주일에 2번은 시켜달래서 넘 자주 시키네요~ 금방
              순삭되어요~다 먹어버려서,저는 샐러드만 맛볼수 있는ㅜㅜ
            </div>
            <div className="review__owner-comment owner-comment">
              <div className="owner-comment__header">
                <div className="owner-comment-info">
                  <div className="owner-comment__owner">사장님</div>
                  <div className="owner-comment__time">7시간 전</div>
                </div>
                <div className="owner-comment__report">신고</div>
              </div>
              <div className="owner-comment__content">
                앞으로도 맛있는것만 드리는 파스토보이가 되겠습니다! 찜 꾸욱
                눌러주시고 또 찾아주세요 감사합니다!💞 #❣파스타 맛집❣
                #💚연중무휴 24시간💚 #💞내 집안 레스토랑💞
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetailCleanReview;
