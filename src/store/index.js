import { configureStore } from "@reduxjs/toolkit";
import keranjangReducer from "./keranjang";
import todoReducer from "./todo";

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    todo: todoReducer,
  },
});
