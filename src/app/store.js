import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadState()?.user || {
    userData: null,
    userRole: null,
    userAddress: null,
    userPhone: null,
    accessToken: null,
    tokenMaxAge: null,
    isLoggedIn: false,
    locationData: { latitude: "", longitude: "", geocodeAddress: "" }, // 지오코딩 주소 추가
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
    logout: state => {
      state.userData = null;
      state.userRole = null;
      state.userAddress = null;
      state.userPhone = null;
      state.accessToken = null;
      state.tokenMaxAge = null;
      state.isLoggedIn = false;
      state.locationData = { latitude: "", longitude: "", geocodeAddress: "" };
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
  logout,
} = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  // 로그인 상태인 경우에만 로컬스토리지를 업데이트
  if (state.user.isLoggedIn) {
    saveState(state);
  }
});

export default store;
