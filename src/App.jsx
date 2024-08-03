import { Route, Routes } from "react-router-dom";
import Accept from "./components/admin/Accept";
import AcceptDetail from "./components/admin/AcceptDetail";
import Ask from "./components/admin/Ask";
import AskDetail from "./components/admin/AskDetail";
import CategorySetting from "./components/admin/CategorySetting";
import Report from "./components/admin/Report";
import ReportDetail from "./components/admin/ReportDetail";
import Home from "./components/ceo/Home";
import LoginPageforCEO from "./components/ceo/LogintestforCeo";
import OrdersAccepted from "./components/ceo/OrdersAccepted";
import OrdersDetail from "./components/ceo/OrdersDetail";
import OrdersHistory from "./components/ceo/OrdersHistory";
import Reviews from "./components/ceo/Reviews";
import Statistics from "./components/ceo/Statistics";
import StoreManagement from "./components/ceo/StoreManagement";
import AdminLayout from "./components/layout/AdminLayout";
import CeoLayout from "./components/layout/CeoLayout";
import RootLayout from "./components/layout/RootLayout";
import MyPageOrderCloseDetail from "./components/user/mypage/MyPageOrderCloseDetail";
import AdminPage from "./pages/AdminPage";
import AuthCeoPage from "./pages/AuthCeoPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthUserPage from "./pages/AuthUserPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CeoPage from "./pages/CeoPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import MyPageAddress from "./pages/MyPageAddress";
import MyPageOrderClosePage from "./pages/MyPageOrderClosePage";
import MyPageOrderPage from "./pages/MyPageOrderPage.jsx";
import MyPageOrderPagee from "./pages/MyPageOrderPagee";
import MyPageReviewPage from "./pages/MyPageReviewPage";
import MypageReportPage from "./pages/MypageReportPage";
import MypageUserWithdrawal from "./pages/MypageUserWithdrawal";
import NotFound from "./pages/NotFound.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProjectInfo from "./pages/ProjectInfo.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import Test from "./pages/Test";
import Test3 from "./pages/Test3";
import { OrderProvider } from "./pages/user/OrderContext";
import RestaurantDetailPage2 from "./pages/user/RestaurantDetailPage2";

function App() {
  return (
    <OrderProvider>
      <div className="root-wrap">
        <Routes>
          {/* 로그인 및 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth">
            <Route index element={<AuthPage />} />
            <Route path="user" element={<AuthUserPage />} />
            <Route path="ceo" element={<AuthCeoPage />} />
          </Route>

          {/* 유저 */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="restaurant/:id" element={<RestaurantsPage />} />
            <Route path="restaurants/:id" element={<RestaurantDetailPage2 />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="mypage">
              <Route index element={<MyPage />} />
              <Route path="order/:id" element={<MyPageOrderPage />} />
              <Route path="ordere" element={<MyPageOrderPagee />} />
              <Route path="report" element={<MypageReportPage />} />
              <Route path="orderclose">
                <Route index element={<MyPageOrderClosePage />} />
                <Route path=":id" element={<MyPageOrderCloseDetail />} />
              </Route>
              <Route path="review" element={<MyPageReviewPage />} />
              <Route path="address" element={<MyPageAddress />} />
              <Route path="withdrawal" element={<MypageUserWithdrawal />} />
            </Route>
            <Route path="payment/:id" element={<PaymentPage />} />
            <Route path="projectinfo" element={<ProjectInfo />} />
          </Route>

          {/* 사업자 */}
          <Route path="/ceopage" element={<CeoLayout />}>
            <Route index element={<CeoPage />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginPageforCEO />} />
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

          {/* 관리자 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="category-setting" element={<CategorySetting />} />
            <Route path="ask">
              <Route index element={<Ask />} />
              <Route path="details/:askPk" element={<AskDetail />} />
            </Route>
            <Route path="report">
              <Route index element={<Report />} />
              <Route path="details/:reportPk" element={<ReportDetail />} />
            </Route>
            <Route path="accept">
              <Route index element={<Accept />} />
              <Route path="details" element={<AcceptDetail />} />
            </Route>
          </Route>

          {/* 공통 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/toastTest" element={<Test />} />
          <Route path="/paymentTest" element={<Test3 />} />
        </Routes>
      </div>
    </OrderProvider>
  );
}

export default App;
