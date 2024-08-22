import { useNavigate } from "react-router-dom";
import GoogleMaps from "../../components/common/GoogleMaps";
import "./IntroPage.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const IntroPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  // 검색 버튼 기능
  const onClickSearch = () => {
    navigate("/");
  };

  return (
    <div className="intro-page">
      <header className="intro-page__header">
        <a href="/" className="intro-page__header-logo">
          주문이요
        </a>
        {!isLoggedIn && (
          <div className="intro-page__header-buttons">
            <a href="/login" className="intro-page__header-login intro-btn">
              로그인
            </a>
            <a href="/auth" className="intro-page__header-signup intro-btn">
              회원가입
            </a>
          </div>
        )}
      </header>
      <div className="intro-page__inner">
        <h2 className="intro-page__title">
          서비스 이용을 위한 주소를 입력해주세요
        </h2>
        <div className="intro-page__main">
          <div className="intro-page__location-search">
            <div className="intro-page__location-search-input">
              <GoogleMaps />
            </div>
            <button
              className="intro-page__location-search-btn"
              onClick={onClickSearch}
            >
              검색
            </button>
          </div>
          <a href="/auth" className="intro-page__signup">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
