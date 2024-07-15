import { useState, useEffect } from "react";
import { fetchRestaurantlist } from "../api/user/fetchRestaurantlist";

const useFetchRestaurantData = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRestaurantlist();
      setRestaurantData(data); // 받아온 데이터를 바로 저장 (이미 list 형태)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 초기 데이터 가져오기
  }, []);

  return { restaurantData, isLoading, error, fetchData };
};

export default useFetchRestaurantData;
