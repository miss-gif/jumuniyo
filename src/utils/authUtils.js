// utils/authUtils.js
import axios from "axios";
import { logout } from "../app/store";
import { removeCookie } from "./cookie";

export const handleLogout = async (accessToken, dispatch, navigate) => {
  try {
    const response = await axios.get("/api/sign-out", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.statusCode === 1) {
      dispatch(logout());
      removeCookie("accessToken");
      localStorage.removeItem("state");
      navigate("/login");
    } else {
      console.error("Logout failed: ", response.data.resultMsg);
    }
  } catch (error) {
    console.error("Error occurred during logout: ", error);
  }
};
