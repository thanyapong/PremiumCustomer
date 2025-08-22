

import { RootState } from "../../../redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** สร้าง Type ของ State และ Intitial State **/
export type CustomerPaymentState = {
    paymentMethodSelected: number; // เก็บ payment method ที่เลือก
};

const initialState: CustomerPaymentState = {
    paymentMethodSelected: 0
};

const CustomerPaymentSlice = createSlice({
    name: "customerPaymentSlice",
    initialState,
    reducers: {

        updatePaymentMethodSelected: (state, action: PayloadAction<number>) => {
            state.paymentMethodSelected = action.payload;
        },

        reset: () => initialState,
    },
});

// สร้าง Action จาก Slice
export const { updatePaymentMethodSelected, reset } = CustomerPaymentSlice.actions;

export const selectCustomerPaymentSlice = (state: RootState) => state.customerPaymentSlice;
// สร้าง Reducer จาก Slice
export default CustomerPaymentSlice.reducer;
