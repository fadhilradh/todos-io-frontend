import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // need {payload} to get the data from the action!!
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.role = payload.role;
      state.username = payload.username;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
