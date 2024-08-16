import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
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
