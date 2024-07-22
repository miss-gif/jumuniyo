import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import GoogleMaps from "./GoogleMaps";
import { setLocationData } from "../../app/userSlice";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false); // 비동기 작업 상태 추적

  const onClickSearch = () => {
    navigate("/restaurant/category_id=0");
  };

  /**
   * 1. 브라우저가 시작될 때 위치 검색 실행한다.
   * 2. 1번 실행 후 latitude, longitude값을 리덕스에 담는다.
   * 3. 로그인 했을 때, 2번 값을 리덕스에서 확인하고, latitude, longitude값이 없으면
   * userData.mainAddr.addrCoorX, userData.mainAddr.addrCoorY 값을 사용하고 리덕스를 업데이트한다.
   */

  // 리덕스에서 위치 데이터와 주소 좌표 가져오기
  const locationData = useSelector(state => state.user.locationData);
  const userData = useSelector(state => state.user.userData);
  const addrCoorX = userData?.mainAddr?.addrCoorX ?? null;
  const addrCoorY = userData?.mainAddr?.addrCoorY ?? null;

  // 1. 리덕스에 저장된 위치값이 없으면 브라우저가 시작될 때 위치 검색 실행한다.
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     if (!locationData.latitude && !locationData.longitude && !isFetching) {
  //       setIsFetching(true);
  //       await onClickLocationSearch();
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchLocation();
  // }, [locationData, isFetching]);

  // 2. 1번 실행 후 latitude, longitude값을 리덕스에 담는다.
  const onClickLocationSearch = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocationData({ latitude, longitude }));
        },
        error => {
          setErrorMessage("위치를 가져오는데 실패했습니다: " + error.message);
        },
      );
      navigate("/restaurant/category_id=0");
    } else {
      setErrorMessage("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  // 3. 로그인 했을 때, 2번 값을 리덕스에서 확인하고, latitude, longitude값이 없으면
  // userData.mainAddr.addrCoorX, userData.mainAddr.addrCoorY 값을 사용하고 리덕스를 업데이트한다.
  useEffect(() => {
    if (!locationData.latitude && !locationData.longitude) {
      if (addrCoorX !== null && addrCoorY !== null) {
        dispatch(
          setLocationData({ latitude: addrCoorX, longitude: addrCoorY }),
        );
      }
    }
  }, [addrCoorX, addrCoorY, dispatch, locationData]);

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
        </div>
        {errorMessage && (
          <p className="location-search__error">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
