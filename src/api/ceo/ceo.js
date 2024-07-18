import axios from "axios";
import { getCookie } from "../../utils/cookie";

export const fetchRestaurantInfo = async () => {
  const token = getCookie("accessToken");

  try {
    const response = await axios.get("/api/owner/restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.resultData;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  const token = getCookie("accessToken");

  try {
    const response = await axios.get("/api/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.resultData;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};
