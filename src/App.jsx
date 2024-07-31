import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import AuthCeoPage from "./pages/AuthCeoPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthUserPage from "./pages/AuthUserPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CeoPage from "./pages/CeoPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import MyPageOrderPage from "./pages/MyPageOrderPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProjectInfo from "./pages/ProjectInfo.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import Test from "./pages/Test";
import MyPageOrderPagee from "./pages/MyPageOrderPagee";
import MyPageReviewPage from "./pages/MyPageReviewPage";
import AdminPage from "./pages/AdminPage";
import CeoLayout from "./components/layout/CeoLayout";
import Reviews from "./components/ceo/Reviews";
import StoreManagement from "./components/ceo/StoreManagement";
import Statistics from "./components/ceo/Statistics";
import AdminLayout from "./components/layout/AdminLayout";
import MyPageAddress from "./pages/MyPageAddress";
import MypageUserWithdrawal from "./pages/MypageUserWithdrawal";

import RestaurantDetailPage2 from "./pages/user/RestaurantDetailPage2";

import Home from "./components/ceo/Home";
import OrdersDetail from "./components/ceo/OrdersDetail";
import LoginPageforCEO from "./components/ceo/LogintestforCeo";
import { jwtDecode } from "jwt-decode";
import { OrderProvider } from "./pages/user/OrderContext";
import OrdersAccepted from "./components/ceo/OrdersAccepted";
import OrdersHistory from "./components/ceo/OrdersHistory";
import Test3 from "./pages/Test3";
import MyPageOrderClosePage from "./pages/MyPageOrderClosePage";
import MyPageOrderCloseDetail from "./components/user/mypage/MyPageOrderCloseDetail";
import Ask from "./components/admin/Ask";
import AskDetail from "./components/admin/AskDetail";
import Report from "./components/admin/Report";
import ReportDetail from "./components/admin/ReportDetail";
import CategorySetting from "./components/admin/CategorySetting";

import UserLayout from "./pages/user/layout/UserLayout";
import MainPage from "./pages/user/main";

import Accept from "./components/admin/Accept";
import AcceptDetail from "./components/admin/AcceptDetail";

// 사업자

function App() {
  return (
    <>
      <div className="root-wrap">
        <OrderProvider>
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
              <Route path="/restaurant/:id" element={<RestaurantsPage />} />
              <Route
                path="/restaurants/:id"
                element={<RestaurantDetailPage2 />}
              />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/order/:id" element={<MyPageOrderPage />} />
              <Route path="/mypage/ordere" element={<MyPageOrderPagee />} />
              <Route
                path="/mypage/orderclose"
                element={<MyPageOrderClosePage />}
              />
              <Route
                path="/mypage/orderclose/:id"
                element={<MyPageOrderCloseDetail />}
              />
              <Route path="/mypage/review" element={<MyPageReviewPage />} />
              <Route path="/mypage/address" element={<MyPageAddress />} />
              <Route path="/payment/:id" element={<PaymentPage />} />
              <Route path="/projectinfo" element={<ProjectInfo />} />
              <Route
                path="/mypage/withdrawal"
                element={<MypageUserWithdrawal />}
              />
            </Route>

            {/* 3차용 레이아웃 디자인 */}
            <Route path="/new" element={<UserLayout />}>
              <Route index element={<MainPage />} />
            </Route>

            {/* 사업자 라우터 */}
            <Route path="/ceopage" element={<CeoLayout />}>
              <Route path="/ceopage/" element={<CeoPage />} />
              <Route path="/ceopage/" element={<Home />} />
              <Route path="login" element={<LoginPageforCEO />} />
              <Route path="home" element={<Home />} />
              <Route path="orders-accepted" element={<OrdersAccepted />} />
              <Route path="orders-history" element={<OrdersHistory />} />
              <Route
                path="orders/details/:doneOrderPk"
                element={<OrdersDetail />}
              />
              <Route path="reviews" element={<Reviews />} />
              <Route path="store-management" element={<StoreManagement />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>

            {/* 관리자 라우터 */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/" element={<AdminPage />} />
              <Route path="category-setting" element={<CategorySetting />} />
              <Route path="ask" element={<Ask />} />
              <Route path="ask/details/:askPk" element={<AskDetail />} />
              <Route path="report" element={<Report />} />
              <Route
                path="report/details/:reportPk"
                element={<ReportDetail />}
              />
              <Route path="accept" element={<Accept />} />
              <Route path="accept/details" element={<AcceptDetail />} />
            </Route>

            {/* 공통 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test3" element={<Test3 />} />
          </Routes>
        </OrderProvider>
      </div>
    </>
  );
}

export default App;
