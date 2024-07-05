import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import NotFound from "./pages/common/NotFound.jsx";
import ProjectInfo from "./pages/common/ProjectInfo.jsx";
import Test from "./pages/common/Test";
import { Home, Reviews } from "@mui/icons-material";

// join
import AuthCeoPage from "./pages/join/AuthCeoPage.jsx";
import AuthPage from "./pages/join/AuthPage.jsx";
import AuthUserPage from "./pages/join/AuthUserPage.jsx";
import LoginPage from "./pages/join/LoginPage.jsx";

// user
import HomePage from "./pages/user/HomePage.jsx";
import CartPage from "./pages/user/CartPage.jsx";
import CheckoutPage from "./pages/user/CheckoutPage.jsx";
import MyPage from "./pages/user/MyPage.jsx";
import MyPageOrderPage from "./pages/user/MyPageOrderPage.jsx";
import PaymentPage from "./pages/user/PaymentPage.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import RestaurantDetailPage from "./pages/user/RestaurantDetailPage.jsx";
import RestaurantsPage from "./pages/user/RestaurantsPage.jsx";
import MyPageOrderPagee from "./pages/user/MyPageOrderPagee";
import MyPageReviewPage from "./pages/user/MyPageReviewPage";

// ceo
import CeoPage from "./pages/ceo/CeoPage.jsx";
import CeoLayout from "./components/layout/CeoLayout";
import Orders from "./components/ceo/Orders";
import MenuManagement from "./components/ceo/MenuManagement";
import StoreManagement from "./components/ceo/StoreManagement";
import Statistics from "./components/ceo/Statistics";

// admin
import AdminPage from "./pages/admin/AdminPage";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
    <>
      <div className="root-wrap">
        <Routes>
          {/* 공통 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/user" element={<AuthUserPage />} />
          <Route path="/auth/ceo" element={<AuthCeoPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />

          {/* 유저 */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/order" element={<MyPageOrderPage />} />
            <Route path="/mypage/ordere" element={<MyPageOrderPagee />} />
            <Route path="/mypage/review" element={<MyPageReviewPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/projectinfo" element={<ProjectInfo />} />
          </Route>

          {/* 사업자 라우터 */}
          <Route path="/ceopage" element={<CeoLayout />}>
            <Route path="/ceopage/" element={<CeoPage />} />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
