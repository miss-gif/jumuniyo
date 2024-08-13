import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    price: "",
    content: "",
    name: "",
    minOrderAmount: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const getCookie = name => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return null;
        };

        const accessToken = getCookie("accessToken");

        if (!accessToken) {
          // 액세스 토큰이 없는 경우 로그인 페이지로 이동
          Navigate("/login");
          return;
        }

        const response = await axios.get("/api/coupons/owner", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCoupons(response.data.resultData);
        setLoading(false);
      } catch (error) {
        setError("쿠폰 목록을 가져오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleAddCoupon = async () => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      const response = await axios.post(
        "/api/coupons",
        {
          ...newCoupon,
          price: parseFloat(newCoupon.price),
          minOrderAmount: newCoupon.minOrderAmount
            ? parseFloat(newCoupon.minOrderAmount)
            : null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      //
      setCoupons(prevCoupons => [...prevCoupons, response.data.resultData]);
      setModalMessage("쿠폰이 성공적으로 추가되었습니다.");
      setShowModal(true);
      setShowAddForm(false);
      setNewCoupon({
        price: "",
        content: "",
        name: "",
        minOrderAmount: "",
      });
    } catch (error) {
      setError("쿠폰을 추가하는 중 에러가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleDeleteCoupon = async couponId => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      await axios.delete(`/api/coupons/${couponId}?couponId=${couponId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 쿠폰 목록에서 삭제된 쿠폰 제거
      setCoupons(prevCoupons =>
        prevCoupons.filter(coupon => coupon.id !== couponId),
      );
      setModalMessage("쿠폰이 성공적으로 삭제되었습니다.");
      setShowModal(true);
    } catch (error) {
      setError("쿠폰을 삭제하는 중 에러가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="coupon-wrapforstore">
      <div className="coupon-management">
        <h2>쿠폰 관리</h2>
        <button className="btn" onClick={() => setShowAddForm(!showAddForm)}>
          쿠폰 추가하기
        </button>
        {showAddForm && (
          <div className="add-coupon-form">
            <input
              type="text"
              placeholder="이름"
              value={newCoupon.name}
              onChange={e =>
                setNewCoupon({ ...newCoupon, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="내용"
              value={newCoupon.content}
              onChange={e =>
                setNewCoupon({ ...newCoupon, content: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="가격"
              value={newCoupon.price}
              onChange={e =>
                setNewCoupon({ ...newCoupon, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="최소 주문 금액"
              value={newCoupon.minOrderAmount}
              onChange={e =>
                setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })
              }
            />
            <button onClick={handleAddCoupon}>추가</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>쿠폰 ID</th>
              <th>이름</th>
              <th>내용</th>
              <th>가격</th>
              <th>생성 날짜</th>
              <th>최소 주문 금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.name}</td>
                <td>{coupon.content}</td>
                <td>{coupon.price}</td>
                <td>{new Date(coupon.createdAt).toLocaleString()}</td>
                <td>{coupon.minOrderAmount || "N/A"}</td>
                <td>
                  <button onClick={() => handleDeleteCoupon(coupon.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{modalMessage}</h2>
              <br />
              <button className="btn" onClick={closeModal}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponManagement;
