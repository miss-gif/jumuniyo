import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "./CouponModal.scss";
import { applyCoupon, clearCoupon } from "../../../app/couponSlice";

const CouponModal = ({ isOpen, onRequestClose }) => {
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const appliedCoupon = useSelector(state => state.coupon.appliedCoupon);
  const restaurant = useSelector(state => state.cart.restaurant);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/coupons/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const filteredCoupons = response.data.resultData.filter(
          coupon => coupon.resPk === restaurant.restaurantPk,
        );

        setCoupons(filteredCoupons);
      } catch (error) {
        console.error("쿠폰 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    if (isLoggedIn) {
      fetchCoupons();
    }
  }, [isLoggedIn, accessToken, restaurant.restaurantPk]);

  const handleSelectCoupon = event => {
    setSelectedCoupon(event.target.value);
  };

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      const coupon = coupons.find(
        coupon => coupon.id.toString() === selectedCoupon,
      );
      dispatch(applyCoupon(coupon));
      onRequestClose();
    } else {
      alert("쿠폰을 선택해 주세요.");
    }
  };

  const handleClearCoupon = () => {
    dispatch(clearCoupon());
    setSelectedCoupon("");
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
          {coupons.length > 0 ? (
            <FormControl component="fieldset">
              <FormLabel component="legend">쿠폰 선택</FormLabel>
              <RadioGroup
                aria-label="coupon"
                name="coupons"
                value={selectedCoupon}
                onChange={handleSelectCoupon}
              >
                {coupons.map(coupon => (
                  <FormControlLabel
                    key={coupon.id}
                    value={coupon.id.toString()}
                    control={<Radio />}
                    label={
                      <div className="coupon-details">
                        <h3>{coupon.name}</h3>
                        <p>할인 가격: {coupon.price}원</p>
                        <p>최소 주문 금액: {coupon.minOrderAmount}원</p>
                        <p>상점 이름: {coupon.resName}</p>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <p>사용 가능한 쿠폰이 없습니다.</p>
          )}
        </div>

        <div className="적용된 쿠폰">
          {appliedCoupon ? (
            <div>
              <h3>적용된 쿠폰: {appliedCoupon.name}</h3>
              <p>할인 금액: {appliedCoupon.price}원</p>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearCoupon}
              >
                쿠폰 적용 해제
              </Button>
            </div>
          ) : (
            <p>적용된 쿠폰이 없습니다.</p>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyCoupon}
          disabled={!selectedCoupon}
        >
          쿠폰 적용
        </Button>
      </div>
    </Modal>
  );
};

CouponModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default CouponModal;
