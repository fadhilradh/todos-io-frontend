import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  username: null,
  userId: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // need {payload} to get the data from the action!!
    login: (state, { payload: { role, username, userId, accessToken } }) => {
      state.isLoggedIn = true;
      state.role = role;
      state.username = username;
      state.userId = userId;
      state.accessToken = accessToken;
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
