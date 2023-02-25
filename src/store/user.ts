import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  role: null,
  username: null,
  userId: null,
  accessToken: null,
  profilePic: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // need {payload} to get the data from the action!!
    login: (
      state,
      { payload: { role, username, userId, accessToken, profilePicUrl } },
    ) => {
      state.isLoggedIn = true
      state.role = role
      state.username = username
      state.userId = userId
      state.accessToken = accessToken
      state.profilePic = profilePicUrl
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.role = null
      state.username = null
      state.userId = null
      state.profilePic = ""
    },
    changeProfilePic: (state, { payload }) => {
      state.profilePic = payload
    },
  },
})

export const { login, logout, changeProfilePic } = userSlice.actions

export default userSlice.reducer
