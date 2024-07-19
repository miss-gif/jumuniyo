import axios from "axios";
import { getCookie, removeCookie } from "../../utils/cookie";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  config => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        removeCookie("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const fetchRestaurantInfo = async () => {
  try {
    const response = await api.get("/owner/restaurant");
    return response.data.resultData;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/user-info");
    return response.data.resultData;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};
