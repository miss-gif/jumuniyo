import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFollowedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(state => state.user.accessToken);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const fetchFollowedRestaurants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/restaurant/followed", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.statusCode === 1) {
          setRestaurants(response.data.resultData.list);
        } else {
          console.error("API 응답 오류:", response.data.resultMsg);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchFollowedRestaurants();
    }
  }, [isLoggedIn, accessToken]);

  return { restaurants, loading };
};

export default useFollowedRestaurants;
