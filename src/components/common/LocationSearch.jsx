import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import "../../css/base/_breakPoint.scss";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [locationData, setLocationData] = useState(null);

  const onClickLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocationData(`위도: ${latitude}, 경도: ${longitude}`);
        },
        error => {
          console.error("위치를 가져오는데 실패했습니다:", error);
        },
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  return (
    <div className="LocationSearch">
      {isHomePage && (
        <div>
          <h2>&quot;배달은 역시, 속전속결!&quot;</h2>
          <p>받으실 동 이름으로 검색해주세요</p>
        </div>
      )}
      <div className="locationSearch__group">
        <button
          className="LocationSearch__icon"
          onClick={onClickLocationSearch}
        >
          <MyLocationIcon sx={{ fontSize: 20 }} />
        </button>
        <div className="locationSearch__input">
          <input
            type="text"
            placeholder="건물명, 도로명, 지번으로 검색하세요."
            value={locationData}
          />
          <button className="search-btn">검색</button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
