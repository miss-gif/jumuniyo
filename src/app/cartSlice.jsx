import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurant: "", // Add restaurant details to the state
  },
  reducers: {
    addItem: (state, action) => {
      const { item, restaurant } = action.payload;

      // Check if restaurant information is already set
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
    },
    clearCart: state => {
      state.items = [];
      state.restaurant = null; // Clear restaurant data when cart is cleared
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
