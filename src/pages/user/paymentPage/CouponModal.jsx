import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "./CouponModal.scss";

const CouponModal = ({ isOpen, onRequestClose }) => {
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState({}); // 선택된 쿠폰 상태

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/coupons/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCoupons(response.data.resultData);
        console.log(response.data.resultData);
      } catch (error) {
        console.error("쿠폰 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    if (isLoggedIn) {
      fetchCoupons();
    }
  }, [isLoggedIn, accessToken]);

  const handleToggleCoupon = couponId => {
    setSelectedCoupons(prev => ({
      ...prev,
      [couponId]: !prev[couponId],
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal"
      overlayClassName="overlay"
    >
      <div className="modal__content">
        <h2 className="modal__title">쿠폰 목록</h2>
        <button className="modal__content-close">
          <IoIosClose fontSize={30} onClick={onRequestClose} />
        </button>

        <div className="coupon-list">
          {coupons.map(coupon => (
            <div key={coupon.id} className="coupon-item">
              <div className="coupon-details">
                <h3>{coupon.name}</h3>
                <p>할인 가격: {coupon.price}원</p>
                <p>최소 주문 금액: {coupon.minOrderAmount}원</p>
                <p>상점 이름: {coupon.resName}</p>
              </div>
              <div className="coupon-toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCoupons[coupon.id] || false}
                    onChange={() => handleToggleCoupon(coupon.id)}
                  />
                  사용
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

CouponModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default CouponModal;
