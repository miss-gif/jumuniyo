/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import GoogleMaps from "../../components/common/GoogleMaps";
import UserHeaders from "../user/layout/UserHeaders";
import "./IntroPage.scss";

const IntroPage = () => {
  const navigate = useNavigate();
  // 검색 버튼 기능
  const onClickSearch = () => {
    navigate("/restaurant/category_id=0");
  };

  return (
    <div className="intro-page">
      <UserHeaders />
      <div className="inner-60">
        <div className="메인">
          <h2>Order delivery near you</h2>
          <div className="location-search__input">
            <GoogleMaps />
            <button className="location-search__btn" onClick={onClickSearch}>
              검색
            </button>
          </div>
          <div className="회원가입a">회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
