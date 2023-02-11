import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  username: null,
  userId: null,
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
      state.userId = payload.userId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.username = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
