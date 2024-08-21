import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "./MyPage";

interface MenuOption {
  option_pk: number;
  option_menu_pk: number;
  option_name: string;
  option_price: number;
}

interface MenuInfo {
  order_menu_name: string;
  order_menu_price: number;
  order_menu_count: number;
  menu_options: MenuOption[];
}

interface OrderData {
  resName: string;
  orderPk: string;
  createdAt: string;
  orderState: number;
  orderPhone: string;
  orderAddress: string;
  orderRequest: string;
  paymentMethod: string;
  menus: MenuInfo[];
  orderPrice: number;
}

const MyPageOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("orderData", orderData);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        if (data.statusCode === 1) {
          setOrderData(data.resultData);
          console.log("orderData", data.resultData);
        } else {
          Swal.fire({
            icon: "warning",
            text: "주문 정보를 불러오는 데 실패했습니다.",
          });
        }
      } catch (error) {
        console.error("Error fetching order data", error);
        Swal.fire({
          icon: "warning",
          text: "주문 정보를 불러오는 데 실패했습니다.",
        });
      }
    };

    fetchOrderData();
  }, [id, accessToken]);

  const onCancelOrder = async () => {
    try {
      const response = await axios.put(`/api/order/cancel/list/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      console.log("cancel order", data);

      if (data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: "주문 취소되었습니다.",
        });
        setOrderData(null);
        navigate(`/mypage/orderclose/${data.resultData}`);
      } else {
        Swal.fire({
          icon: "warning",
          text: "주문 취소에 실패했습니다. 다시 시도해 주세요.",
        });
      }
    } catch (error) {
      console.error("Error cancelling order", error);
      Swal.fire({
        icon: "warning",
        text: "주문 취소에 실패했습니다. 다시 시도해 주세요.",
      });
    }
  };

  if (!orderData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mypage-order">
      <div className="mypage-order-content">
        <div className="mypage-order__header">
          <h2 className="mypage-order__title">주문완료</h2>
          <button className="btn" onClick={onCancelOrder}>
            주문취소
          </button>
        </div>
        <div className="mypage-order__contents">
          <div className="주문완료-안내">
            <p className="mypage-order__thanks">주문 감사합니다</p>
            <p className="mypage-order__confirmation">
              주문 요청이 완료되었으며 고객님의 휴대전화 번호로 주문 확인 문자가
              곧 발송됩니다
            </p>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">배달정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">음식점</p>
              <p className="mypage-order__value">{orderData.resName}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문번호</p>
              <p className="mypage-order__value">{orderData.orderPk}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주문시간</p>
              <p className="mypage-order__value">
                {new Date(orderData.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mypage-order__detail none">
              <p className="mypage-order__label">배달완료시간</p>
              <p className="mypage-order__value">
                {orderData.orderState === 1 ? "배달 완료" : "배달 중"}
              </p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문자 정보</div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">연락처</p>
              <p className="mypage-order__value">{orderData.orderPhone}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">주소</p>
              <p className="mypage-order__value">{orderData.orderAddress}</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">가게 요청사항</p>
              <p className="mypage-order__value">
                {orderData.orderRequest || "없음"}
              </p>
            </div>
            <div className="mypage-order__detail none">
              <p className="mypage-order__label">라이더 요청사항</p>
              <p className="mypage-order__value">없음</p>
            </div>
            <div className="mypage-order__detail">
              <p className="mypage-order__label">결제수단</p>
              <p className="mypage-order__value">
                {orderData.paymentMethod || "없음"}
              </p>
            </div>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">주문내역</div>
            <ul className="mypage-order__item">
              {orderData.menus && orderData.menus.length > 0 ? (
                orderData.menus.map((menu, index) => (
                  <li key={index}>
                    <p className="mypage-order__item-name">
                      {menu.order_menu_name}{" "}
                      <span>x {menu.order_menu_count}개</span>
                    </p>
                    {menu.menu_options.length > 0 && (
                      <ul>
                        {menu.menu_options.map(option => (
                          <li key={option.option_pk}>
                            {option.option_name} (+
                            {option.option_price.toLocaleString()}원)
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mypage-order__item-price">
                      {menu.order_menu_price.toLocaleString()}원
                    </p>
                  </li>
                ))
              ) : (
                <li>주문내역이 없습니다.</li>
              )}
            </ul>
          </div>
          <div className="mypage-order__total">
            <p className="mypage-order__total-label">총 결제금액</p>
            <p className="mypage-order__total-price">
              {orderData.orderPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderPage;
