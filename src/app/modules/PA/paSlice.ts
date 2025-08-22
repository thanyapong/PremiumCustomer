

import { RootState } from "../../../redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** สร้าง Type ของ State และ Intitial State **/
export type PAState = {
    paymentMethodSelected: number; // เก็บ payment method ที่เลือก

    counterBillDialogOpen: boolean; // เก็บสถานะเปิดปิด Dialog สำหรับ Counter Bill

    cenpayDialogOpen: boolean; // เก็บสถานะเปิดปิด Dialog สำหรับ Cenpay
};

const initialState: PAState = {
    paymentMethodSelected: 0,
    counterBillDialogOpen: false,
    cenpayDialogOpen: false
};

const PASlice = createSlice({
    name: "paSlice",
    initialState,
    reducers: {

        updatePaymentMethodSelected: (state, action: PayloadAction<number>) => {
            state.paymentMethodSelected = action.payload;
        },

        updateCounterBillDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.counterBillDialogOpen = action.payload;
        },

        updateCenpayDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.cenpayDialogOpen = action.payload;
        },

        reset: () => initialState,
    },
});

// สร้าง Action จาก Slice
export const { updatePaymentMethodSelected, updateCounterBillDialogOpen, updateCenpayDialogOpen, reset } = PASlice.actions;

export const selectPASlice = (state: RootState) => state.paSlice;
// สร้าง Reducer จาก Slice
export default PASlice.reducer;
