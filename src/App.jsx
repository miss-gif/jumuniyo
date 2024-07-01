import { Route, Routes } from "react-router-dom";
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
import RestaurantDetailPage from "./pages/RestaurantDetailPage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/order" element={<MyPageOrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/projectinfo" element={<ProjectInfo />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/user" element={<AuthUserPage />} />
        <Route path="/auth/ceo" element={<AuthCeoPage />} />
        <Route path="/ceopage/*" element={<CeoPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
