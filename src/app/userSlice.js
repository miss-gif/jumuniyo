import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userRole: null,
    userAddress: null,
    userPhone: null,
    accessToken: null,
    tokenMaxAge: null,
    isLoggedIn: false,
    locationData: { latitude: "", longitude: "", geocodeAddress: "" },
    searchTerm: "", // 현재 검색값을 저장할 상태 변수 추가
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setTokenMaxAge: (state, action) => {
      state.tokenMaxAge = action.payload;
    },
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // 현재 검색값 설정
    },
    clearSearchTerm: state => {
      state.searchTerm = ""; // 검색값 초기화
    },
    logout: state => {
      state.userData = null;
      state.userRole = null;
      state.userAddress = null;
      state.userPhone = null;
      state.accessToken = null;
      state.tokenMaxAge = null;
      state.isLoggedIn = false;
      state.locationData = { latitude: "", longitude: "", geocodeAddress: "" };
      state.searchTerm = ""; // 로그아웃 시 검색값 초기화
    },
  },
});

export const {
  setUserData,
  setUserRole,
  setUserAddress,
  setUserPhone,
  setAccessToken,
  setTokenMaxAge,
  setLocationData,
  setSearchTerm, // 새로운 액션 export
  clearSearchTerm, // 새로운 액션 export
  logout,
} = userSlice.actions;

export default userSlice.reducer;
