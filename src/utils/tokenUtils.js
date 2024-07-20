// utils/tokenUtils.js
import axios from "axios";
import store, { setAccessToken, setTokenMaxAge } from "../app/store";
import { saveState } from "./storageUtils"; // 로컬스토리지에 상태를 저장하는 유틸리티

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
          const { accessToken: newAccessToken, TokenMaxAge: newTokenMaxAge } =
            response.data.resultData;
          if (newAccessToken) {
            dispatch(setAccessToken(newAccessToken));
          }
          if (newTokenMaxAge) {
            dispatch(setTokenMaxAge(newTokenMaxAge));
          }

          // 로컬스토리지 업데이트
          const currentState = store.getState();
          currentState.user.accessToken = newAccessToken;
          currentState.user.tokenMaxAge = newTokenMaxAge;
          saveState(currentState);
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
