'use client';

import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export interface CartState {
  items: Array<CartItem>;
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const itemIdx = state.items.findIndex(({id}) => id === action.payload.id);

      if (itemIdx >= 0) {
        state.items[itemIdx].quantity++;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action: PayloadAction<{id: string}>) => {
      state = {
        ...state,
        items: state.items.filter(({id}) => id !== action.payload.id),
      };
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
