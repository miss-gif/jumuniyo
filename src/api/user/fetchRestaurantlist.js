import axios from "axios";
import { useSelector } from "react-redux";

const { locationData } = useSelector(state => state.user);

const addrX = locationData?.longitude || 0;
const addrY = locationData?.latitude || 0;

// API URL 생성 (위도, 경도 포함)
const API_URL = `/api/restaurant?category_id=0&page=1&order_type=1&addrX=${addrY}&addrY=${addrX}`;

export const fetchRestaurantlist = async () => {
  try {
    const { data } = await axios.get(API_URL);
    if (data.statusCode !== 1) {
      throw new Error(
        `식당 목록 가져오기 실패: ${data.message || "알 수 없는 에러"}`,
      );
    }
    return data.resultData.list; // resultData.list 배열을 반환하도록 수정
  } catch (error) {
    console.error("식당 목록 가져오기 에러:", error.message);
    throw error;
  }
};
