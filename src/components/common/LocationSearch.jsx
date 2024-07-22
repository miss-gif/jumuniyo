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
  const [renderKey, setRenderKey] = useState(0);

  const forceRender = () => {
    setRenderKey(prev => prev + 1);
  };

  // 리덕스에서 위치 데이터와 주소 좌표 가져오기
  const locationData = useSelector(state => state.user.locationData);
  const userData = useSelector(state => state.user.userData);
  const addrCoorX = userData?.mainAddr?.addrCoorX ?? null;
  const addrCoorY = userData?.mainAddr?.addrCoorY ?? null;

  /**
   * 위치 검색 버튼이 클릭되었을때,
   * 위도와 경도값을 리덕스에 업데이트한다.
   */

  // 위치 검색 버튼 클릭 시 호출되는 비동기 함수
  const onClickLocationSearch = async () => {
    // 브라우저가 Geolocation API를 지원하는지 확인
    if (navigator.geolocation) {
      // Geolocation API를 사용하여 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        // 위치를 성공적으로 가져온 경우
        position => {
          // 위치 정보에서 위도와 경도 추출
          const { latitude, longitude } = position.coords;
          // 추출한 위도와 경도를 Redux 액션을 통해 상태로 저장
          dispatch(setLocationData({ latitude, longitude }));
          forceRender(); // 강제 렌더링
        },
        // 위치 정보를 가져오는 데 실패한 경우
        error => {
          // 에러 메시지를 상태로 저장
          setErrorMessage("위치를 가져오는데 실패했습니다: " + error.message);
        },
      );
    } else {
      // 브라우저가 Geolocation API를 지원하지 않는 경우
      setErrorMessage("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  /**
   * 유저의 위치값 addrCoorX, addrCoorY 확인하고
   * 리덕스의 latitude, longitude 업데이트
   * 로그인한 유저의 addrCoorX, addrCoorY 값을 검색창에 불러온다.
   */

  // 컴포넌트가 렌더링될 때마다 실행되는 useEffect 훅
  useEffect(() => {
    // 현재 위치 데이터가 없고, 좌표 값이 null이 아닌 경우
    if (!locationData.latitude && !locationData.longitude) {
      if (addrCoorX !== null && addrCoorY !== null) {
        // 주소 좌표를 위치 데이터로 설정하는 액션 디스패치
        dispatch(
          setLocationData({ latitude: addrCoorX, longitude: addrCoorY }),
        );
      }
    }
  }, [
    // useEffect가 실행될 때 의존하는 변수들
    addrCoorX, // 주소 좌표의 X값
    addrCoorY, // 주소 좌표의 Y값
    dispatch, // Redux 디스패치 함수
    locationData.latitude, // 위치 데이터의 위도
    locationData.longitude, // 위치 데이터의 경도
  ]);

  // 검색 버튼 기능
  const onClickSearch = () => {
    navigate("/restaurant/category_id=0");
  };

  return (
    <div className="location-search" key={renderKey}>
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
