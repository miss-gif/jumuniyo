import axios from "axios";
import { getCookie, setCookie } from "../../utils/cookie";

const jwtAxios = axios.create();
// Request Intercepter
// Access Token 활용하기
const beforeReq = config => {
  let accessToken = getCookie("accessToken");
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

// Reponse
const beforeRes = async res => {
  const respose = await axios.get("/api/auth/access-token");
  setCookie("accessToken", respose.data.accessToken);
  return respose.config;
};

// axios의 intercepter 적용
export default jwtAxios;
