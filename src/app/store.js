// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userRole: null,
    userAddress: null, // 주소 추가
    userPhone: null, // 전화번호 추가
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload; // 주소 설정
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload; // 전화번호 설정
    },
  },
});

export const { setUserData, setUserRole, setUserAddress, setUserPhone } =
  userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
