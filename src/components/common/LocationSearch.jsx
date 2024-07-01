import React from "react";
import { useLocation } from "react-router-dom";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import "../../css/base/_breakPoint.scss";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="LocationSearch">
      {isHomePage && (
        <div>
          <h2>&quot;배달은 역시, 속전속결!&quot;</h2>
          <p>받으실 동 이름으로 검색해주세요</p>
        </div>
      )}
      <div className="locationSearch__group">
        <button className="LocationSearch__icon">
          <MyLocationIcon sx={{ fontSize: 20 }} />
        </button>
        <div className="locationSearch__input">
          <input
            type="text"
            placeholder="건물명, 도로명, 지번으로 검색하세요."
          />
          <button className="search-btn">검색</button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
