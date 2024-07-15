import axios from "axios";

// 로컬 스토리지에서 위치 정보 가져오기
const locationData = JSON.parse(localStorage.getItem("locationData")) || {};

// 위도 및 경도 값이 비어있는지 확인
const isValidLocation = locationData.latitude && locationData.longitude;

// 유효한 위치 정보가 없으면 기본값(대구) 사용, 있으면 로컬 스토리지 값 사용
const {
  latitude = isValidLocation ? locationData.latitude : 35.8714, // 대구의 위도
  longitude = isValidLocation ? locationData.longitude : 128.6014, // 대구의 경도
} = locationData;

// API URL 생성 (위도, 경도 포함)
const API_URL = `/api/restaurant?category_id=1&page=1&order_type=1&addrX=${latitude}&addrY=${longitude}`;

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
