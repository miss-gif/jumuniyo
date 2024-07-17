import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import GoogleMaps from "./GoogleMaps";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Redux에서 주소 좌표 가져오기
  const addrCoorX = useSelector(
    state => state.user.userData?.mainAddr.addrCoorX,
  );
  const addrCoorY = useSelector(
    state => state.user.userData?.mainAddr.addrCoorY,
  );

  // localStorage에서 저장된 위치 값 불러오기
  useEffect(() => {
    const storedLocationData = JSON.parse(localStorage.getItem("locationData"));
    if (storedLocationData) {
      setLocationData(storedLocationData);
    }
  }, []);

  // 위치 값이 변경될 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("locationData", JSON.stringify(locationData));
  }, [locationData]);

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

  const updateLocation = (newLatitude, newLongitude) => {
    setLocationData({ latitude: newLatitude, longitude: newLongitude });
  };

  const onClickAddressCall = () => {
    if (addrCoorX && addrCoorY) {
      const newLocationData = {
        latitude: addrCoorX,
        longitude: addrCoorY,
      };
      localStorage.setItem("locationData", JSON.stringify(newLocationData));
      console.log("주소 호출: ", newLocationData);
      updateLocation(addrCoorX, addrCoorY); // 수정된 부분
    } else {
      setErrorMessage("주소 좌표를 가져오는 데 실패했습니다.");
    }
  };

  const onClickSearch = () => {
    navigate("/restaurant/category_id=0&page=1&order_type=1");
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
          <GoogleMaps
            latitude={locationData.latitude}
            longitude={locationData.longitude}
          />
          <button className="location-search__btn" onClick={onClickSearch}>
            검색
          </button>
          <button onClick={onClickAddressCall}>주소호출</button>
        </div>
        {errorMessage && (
          <p className="location-search__error">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
