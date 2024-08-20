import axios from "axios";
import store from "../../app/store";
import { setCookie } from "../../utils/cookie";

const jwtAxios = axios.create();

// Request Interceptor
const beforeReq = config => {
  const state = store.getState();
  const accessToken = state.user.accessToken;
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
