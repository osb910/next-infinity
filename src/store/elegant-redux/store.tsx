'use client';

import {configureStore} from '@reduxjs/toolkit';
import {cartSlice} from './cart-slice';
import {Provider} from 'react-redux';
import {type ReactNode} from 'react';

export const store = configureStore({
  reducer: cartSlice.reducer,
});

export const ElegantProvider = ({children}: {children: ReactNode}) => (
  <Provider store={store}>{children}</Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
