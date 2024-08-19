import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurant: null, // 레스토랑 정보를 저장
  },
  reducers: {
    addItem: (state, action) => {
      const { item, restaurant } = action.payload;

      // 다른 레스토랑의 아이템이 추가되려는 경우, 장바구니 초기화
      if (
        state.restaurant &&
        state.restaurant.restaurantPk !== restaurant.restaurantPk
      ) {
        state.items = [];
        state.restaurant = restaurant;
      }

      // 처음으로 레스토랑 정보가 설정되는 경우
      if (!state.restaurant) {
        state.restaurant = restaurant;
      }

      const existingItem = state.items.find(
        menuItem =>
          menuItem.menu_pk === item.menu_pk &&
          JSON.stringify(menuItem.selectedOptions) ===
            JSON.stringify(item.selectedOptions),
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const menu_pk = action.payload;
      const item = state.items.find(item => item.menu_pk === menu_pk);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const menu_pk = action.payload;
      const item = state.items.find(item => item.menu_pk === menu_pk);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const menu_pk = action.payload;
      state.items = state.items.filter(item => item.menu_pk !== menu_pk);
      if (state.items.length === 0) {
        state.restaurant = null; // 마지막 아이템이 제거되면 레스토랑 정보도 초기화
      }
    },
    clearCart: state => {
      state.items = [];
      state.restaurant = null; // 장바구니를 비울 때 레스토랑 정보도 초기화
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
