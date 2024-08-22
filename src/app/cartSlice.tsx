import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태 및 액션을 위한 타입 정의
interface Item {
  menu_pk: number;
  selectedOptions: string[];
  quantity?: number;
}

interface Restaurant {
  restaurantPk: number;
}

interface CartState {
  items: Item[];
  restaurant: Restaurant | null;
}

interface AddItemPayload {
  item: Item;
  restaurant: Restaurant;
}

interface QuantityPayload {
  menu_pk: number;
  selectedOptions: string[];
}

// 헬퍼 함수: 레스토랑 변경 시 장바구니 초기화
const resetCartForNewRestaurant = (
  state: CartState,
  restaurant: Restaurant,
) => {
  state.items = [];
  state.restaurant = restaurant;
};

// 헬퍼 함수: 고유 아이템 키 생성
const generateItemKey = (item: Item): string =>
  `${item.menu_pk}-${JSON.stringify(item.selectedOptions)}`;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as Item[],
    restaurant: null as Restaurant | null,
  } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { item, restaurant } = action.payload;

      if (
        state.restaurant &&
        state.restaurant.restaurantPk !== restaurant.restaurantPk
      ) {
        resetCartForNewRestaurant(state, restaurant);
      } else if (!state.restaurant) {
        state.restaurant = restaurant;
      }

      const itemKey = generateItemKey(item);
      const existingItem = state.items.find(
        menuItem => generateItemKey(menuItem) === itemKey,
      );

      if (existingItem) {
        if (existingItem.quantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<QuantityPayload>) => {
      const { menu_pk, selectedOptions } = action.payload;
      const itemKey = `${menu_pk}-${JSON.stringify(selectedOptions)}`;
      const item = state.items.find(item => generateItemKey(item) === itemKey);
      if (item && item.quantity) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<QuantityPayload>) => {
      const { menu_pk, selectedOptions } = action.payload;
      const itemKey = `${menu_pk}-${JSON.stringify(selectedOptions)}`;
      const item = state.items.find(item => generateItemKey(item) === itemKey);
      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<QuantityPayload>) => {
      const { menu_pk, selectedOptions } = action.payload;
      const itemKey = `${menu_pk}-${JSON.stringify(selectedOptions)}`;
      state.items = state.items.filter(
        item => generateItemKey(item) !== itemKey,
      );
      if (state.items.length === 0) {
        state.restaurant = null;
      }
    },
    clearCart: state => {
      state.items = [];
      state.restaurant = null;
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
