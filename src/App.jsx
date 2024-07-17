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
import MenuManagement from "./components/ceo/MenuManagement";
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
import Pay from "./components/restaurantdetail/Pay";
import OrdersAccepted from "./components/ceo/OrdersAccepted";
import OrdersHistory from "./components/ceo/OrdersHistory";
import LoginTest from "./pages/LoginTest";

// gmu 테스트
const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// 사업자

function App() {
  // gmu 테스트
  const accessToken = getCookie("accessToken");
  console.log(accessToken);

  let userPk = null;
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    console.log("Decoded Token:", decodedToken);
    const signedUser = JSON.parse(decodedToken.signedUser);
    userPk = signedUser.userPk; // userPk 추출
  }

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
              <Route path="/pay" element={<Pay />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/order/:id" element={<MyPageOrderPage />} />
              <Route path="/mypage/ordere" element={<MyPageOrderPagee />} />
              <Route path="/mypage/review" element={<MyPageReviewPage />} />
              <Route path="/mypage/address" element={<MyPageAddress />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/projectinfo" element={<ProjectInfo />} />
              <Route
                path="/mypage/withdrawal"
                element={<MypageUserWithdrawal />}
              />
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
            <Route path="/login-test" element={<LoginTest />} />
          </Routes>
        </OrderProvider>
      </div>
    </>
  );
}

export default App;
