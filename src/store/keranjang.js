import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const keranjangSlice = createSlice({
  name: "keranjang",
  initialState,
  reducers: {
    tambahBarang: (state) => {
      state.value += 1;
    },
    kurangiBarang: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

export const { tambahBarang, kurangiBarang } = keranjangSlice.actions;

export default keranjangSlice.reducer;
