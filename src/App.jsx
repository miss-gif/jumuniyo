import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import AuthCeoPage from "./pages/AuthCeoPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthUserPage from "./pages/AuthUserPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import MyPageOrderPage from "./pages/MyPageOrderPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProjectInfo from "./pages/ProjectInfo.jsx";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import Test from "./pages/Test";
import MyPageOrderListPage from "./pages/MyPageOrderListPage.jsx";
import MyPageReviewPage from "./pages/MyPageReviewPage";
import AdminPage from "./pages/AdminPage";
import CeoLayout from "./components/layout/CeoLayout";
import Reviews from "./components/ceo/Reviews";
import Orders from "./components/ceo/Orders";
import MenuManagement from "./components/ceo/MenuManagement";
import StoreManagement from "./components/ceo/StoreManagement";
import Statistics from "./components/ceo/Statistics";
import AdminLayout from "./components/layout/AdminLayout";
import MyPageAddress from "./pages/MyPageAddress";
import MypageUserWithdrawal from "./pages/MypageUserWithdrawal";

import RestaurantDetailPage2 from "./pages/user/RestaurantDetailPage2";

import Home from "./components/ceo/Home";
import MyPageLayout from "./components/layout/MyPageLayout";

// 사업자

function App() {
  return (
    <>
      <div className="root-wrap">
        <Routes>
          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 회원가입 */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/user" element={<AuthUserPage />} />
          <Route path="/auth/ceo" element={<AuthCeoPage />} />

          {/* 유저 */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
            <Route path="/restaurants/re" element={<RestaurantDetailPage2 />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/projectinfo" element={<ProjectInfo />} />
            <Route path="/orderview" element={<MyPageOrderPage />} />
            {/* 마이페이지 */}
            <Route path="/" element={<MyPageLayout />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/order" element={<MyPageOrderListPage />} />
              <Route path="/mypage/order/:id" element={<MyPageOrderPage />} />
              <Route path="/mypage/review" element={<MyPageReviewPage />} />
              <Route path="/mypage/address" element={<MyPageAddress />} />
              <Route
                path="/mypage/withdrawal"
                element={<MypageUserWithdrawal />}
              />
            </Route>
          </Route>

          {/* 사업자 라우터 */}
          <Route path="/ceopage" element={<CeoLayout />}>
            <Route path="/ceopage/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu-management" element={<MenuManagement />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="store-management" element={<StoreManagement />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>

          {/* 관리자 라우터 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/" element={<AdminPage />} />
          </Route>

          {/* 공통 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
