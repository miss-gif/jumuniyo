// utils/tokenUtils.js
import axios from "axios";
import { setAccessToken, setTokenMaxAge } from "../app/userSlice";

export const scheduleTokenRefresh = (accessToken, dispatch) => {
  return setInterval(
    async () => {
      try {
        const response = await axios.get("/api/access-token", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.statusCode === 1) {
          const { accessToken: newAccessToken, tokenMaxAge: newTokenMaxAge } =
            response.data.resultData;
          if (newAccessToken) {
            dispatch(setAccessToken(newAccessToken));
          }
          if (newTokenMaxAge) {
            dispatch(setTokenMaxAge(newTokenMaxAge));
          }

          // 상태 업데이트는 redux-persist가 자동으로 처리하므로, 별도로 로컬스토리지에 저장할 필요 없음
        } else {
          console.error("Token extension failed: ", response.data.resultMsg);
        }
      } catch (error) {
        console.error("Error occurred while extending the token: ", error);
      }
    },
    10 * 60 * 1000,
  ); // 10분마다 토큰 갱신 시도
};
