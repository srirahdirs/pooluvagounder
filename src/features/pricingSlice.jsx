// features/pricingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pricingSlice = createSlice({
    name: 'pricing',
    initialState: {
        selectedPlanId: null,
        planPrice: null,
    },
    reducers: {
        setSelectedPlanId: (state, action) => {
            state.selectedPlanId = action.payload;
        },
        setPlanPrice: (state, action) => {
            state.planPrice = action.payload;
        }

    },
});

export const { setSelectedPlanId, setPlanPrice } = pricingSlice.actions;
export default pricingSlice.reducer;