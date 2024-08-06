/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

const RestaurantDetailTabInfo = ({ restaurantData }) => {
  const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;

  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${rest_api_key}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 좌표 설정 (서울시청)
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소로 좌표를 검색하여 지도에 표시합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          restaurantData.restaurantAddr,
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x,
              );
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              map.setCenter(coords);
            }
          },
        );
      });
    };
  }, [restaurantData.restaurantAddr]);

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
          <div className="restaurant-detail-tab-info__info none">
            <p className="restaurant-detail-tab-info__info-title">전화번호</p>
            <p className="restaurant-detail-tab-info__info-detail">
              050-1234-4321 (주문이요 제공 번호)
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info">
            <p className="restaurant-detail-tab-info__info-title">주소</p>
            <p className="restaurant-detail-tab-info__info-detail">
              {restaurantData.restaurantAddr}
            </p>
          </div>
          <div className="restaurant-detail-tab-info__info none">
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
              신용카드, 현금, 웹 결제
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
        <div className="restaurant-detail-tab-info__title">지도정보</div>
        <div className="restaurant-detail-tab-info__content">
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </div>
      </div>
      <div className="restaurant-detail-tab-info__wrap none">
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
