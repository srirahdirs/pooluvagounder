// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import pricingReducer from '../src/features/pricingSlice'

export const store = configureStore({
    reducer: {
        pricing: pricingReducer,
    },
});