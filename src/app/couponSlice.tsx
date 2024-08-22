import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태를 위한 타입 정의
interface CouponState {
  appliedCoupon: string | null; // 쿠폰 코드가 문자열이라고 가정
}

// 초기 상태
const initialState: CouponState = {
  appliedCoupon: null,
};

// 슬라이스 생성
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    // 쿠폰 적용 액션
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.appliedCoupon = action.payload;
    },
    // 쿠폰 제거 액션
    clearCoupon: state => {
      state.appliedCoupon = null;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { applyCoupon, clearCoupon } = couponSlice.actions;

export default couponSlice.reducer;
