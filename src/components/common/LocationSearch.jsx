import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onClickLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocationData({ latitude, longitude });
        },
        error => {
          setErrorMessage("위치를 가져오는데 실패했습니다: " + error.message);
        },
      );
    } else {
      setErrorMessage("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  return (
    <div className="location-search">
      {isHomePage && (
        <div>
          <h2>&quot;배달은 역시, 속전속결!&quot;</h2>
          <p>받으실 동 이름으로 검색해주세요</p>
        </div>
      )}
      <div className="location-search__group">
        <button
          className="location-search__icon"
          onClick={onClickLocationSearch}
        >
          <MyLocationIcon sx={{ fontSize: 24 }} />
        </button>
        <div className="location-search__input">
          <input
            type="text"
            placeholder="건물명, 도로명, 지번으로 검색하세요."
            value={
              locationData.latitude && locationData.longitude
                ? `위도: ${locationData.latitude}, 경도: ${locationData.longitude}`
                : ""
            }
            readOnly
          />
          <button className="location-search__btn">검색</button>
        </div>
        {errorMessage && (
          <p className="location-search__error">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
