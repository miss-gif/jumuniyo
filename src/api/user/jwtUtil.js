import axios from "axios";
import { getCookie, setCookie } from "../../utils/cookie";
import store from "../../app/store";

const jwtAxios = axios.create();

// Request Interceptor
const beforeReq = config => {
  const state = store.getState(); // Redux store에서 현재 상태 가져오기
  const accessToken = state.user.accessToken || "";
  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Response Interceptor
const beforeRes = async res => {
  const response = await axios.get("/api/auth/access-token");
  setCookie("accessToken", response.data.accessToken);
  return response.config;
};

export default jwtAxios;
