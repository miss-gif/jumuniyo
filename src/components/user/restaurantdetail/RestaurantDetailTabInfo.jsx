/* eslint-disable react/prop-types */
import React from "react";

const RestaurantDetailTabInfo = ({ restaurantData }) => {
  return (
    <div className="restaurant-detail-tab-info">
      <div className="restaurant-detail-tab-info__wrap">
        <div className="restaurant-detail-tab-info__title">사장님알림</div>
        <div className="restaurant-detail-tab-info__content">
          {restaurantData.reviewDesc}
        </div>
      </div>
      <div className="restaurant-detail-tab-info__wrap">
        <div className="restaurant-detail-tab-info__title">업체정보</div>
        <div className="restaurant-detail-tab-info__content">
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">영업시간</p>
            <p className="restaurant-detail-tab-info__info-detail">
              {restaurantData.openTime} - {restaurantData.closeTime}
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">전화번호</p>
            <p className="restaurant-detail-tab-info__info-detail">
              050352550768 (요기요 제공 번호) (userPhone백엔드에
              가져와달라고하기)
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">주소</p>
            <p className="restaurant-detail-tab-info__info-detail">
              {restaurantData.restaurantAddr}
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">부가정보</p>
            <p className="restaurant-detail-tab-info__info-detail">
              세스코멤버스 사업장
            </p>
          </div>
        </div>
      </div>
      <div className="restaurant-detail-tab-info__wrap">
        <div className="restaurant-detail-tab-info__title">결제정보</div>
        <div className="restaurant-detail-tab-info__content">
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">결제수단</p>
            <p className="restaurant-detail-tab-info__info-detail">
              신용카드, 현금, 요기서결제
            </p>
          </div>
        </div>
      </div>
      <div className="restaurant-detail-tab-info__wrap">
        <div className="restaurant-detail-tab-info__title">사업자정보</div>
        <div className="restaurant-detail-tab-info__content">
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">상호명</p>
            <p className="restaurant-detail-tab-info__info-detail">
              {restaurantData.restaurantName}
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">
              사업자등록번호
            </p>
            <p className="restaurant-detail-tab-info__info-detail">
              {restaurantData.regiNum}
            </p>
          </div>
        </div>
      </div>
      <div className="restaurant-detail-tab-info__wrap">
        <div className="restaurant-detail-tab-info__title">원산지정보</div>
        <div className="restaurant-detail-tab-info__content">
          <p className="restaurant-detail-tab-info__info-detail">
            [스테이크] 목살 스테이크 샐러드(돼지고기:스페인산) 그릴드 치킨
            스테이크 샐러드(닭고기:브라질산)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailTabInfo;
