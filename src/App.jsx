import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import RootLayout from "./components/layout/RootLayout";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthUserPage from "./pages/AuthUserPage.jsx";
import AuthCeoPage from "./pages/AuthCeoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import MyPageOrderPage from "./pages/MyPageOrderPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/user" element={<AuthUserPage />} />
          <Route path="/auth/ceo" element={<AuthCeoPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
