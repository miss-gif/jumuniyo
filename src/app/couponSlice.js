// couponSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appliedCoupon: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
    },
    clearCoupon: state => {
      state.appliedCoupon = null;
    },
  },
});

export const { applyCoupon, clearCoupon } = couponSlice.actions;

export default couponSlice.reducer;
