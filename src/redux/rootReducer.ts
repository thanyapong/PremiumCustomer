import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import layoutSlice, { persistConfig } from "../app/layout/layoutSlice";
import customerPaymentSlice from "../app/modules/CustomerPayment/customerPaymentSlice";
import paSlice from "../app/modules/PA/paSlice";

export const rootReducer = combineReducers({
    layout: persistReducer(persistConfig, layoutSlice),
    customerPaymentSlice: customerPaymentSlice,
    paSlice: paSlice,
});
