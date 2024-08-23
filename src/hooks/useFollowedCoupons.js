import { useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFollowedCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const fetchFollowedCoupons = useCallback(async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    try {
      const response = await axios.get("/api/coupons/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.statusCode === 1) {
        setCoupons(response.data.resultData);
      } else {
        console.error("API 응답 오류:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("쿠폰 목록을 불러오는 데 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, isLoggedIn]);

  return { coupons, loading, fetchFollowedCoupons };
};

export default useFollowedCoupons;
