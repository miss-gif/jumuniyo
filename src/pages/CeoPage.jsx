import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Home from "../components/ceo/Home";
import Orders from "../components/ceo/Orders";
import MenuManagement from "../components/ceo/MenuManagement";
import Reviews from "../components/ceo/Reviews";
import StoreManagement from "../components/ceo/StoreManagement";
import Statistics from "../components/ceo/Statistics";
import CeoHeader from "../components/layout/CeoHeader";

const CeoPage = () => {
  return (
    <div className="ceo-page">
      <CeoHeader />
      <div className="ceo-page__main">
        <aside className="ceo-page__menu">
          <Link to="home" className="ceo-page__menu-item">
            홈
          </Link>
          <Link to="orders" className="ceo-page__menu-item">
            주문내역
          </Link>
          <Link to="menu-management" className="ceo-page__menu-item">
            메뉴관리
          </Link>
          <Link to="reviews" className="ceo-page__menu-item">
            리뷰관리
          </Link>
          <Link to="store-management" className="ceo-page__menu-item">
            매장관리
          </Link>
          <Link to="statistics" className="ceo-page__menu-item">
            통계
          </Link>
        </aside>
        <div className="ceo-page__content-wrap">
          <div className="ceo-page__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="menu-management" element={<MenuManagement />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="store-management" element={<StoreManagement />} />
              <Route path="statistics" element={<Statistics />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CeoPage;
