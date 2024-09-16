import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import calendarReducer from './calenderSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        calendar: calendarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;