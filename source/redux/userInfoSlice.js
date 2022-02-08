import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'userInfoState',
  initialState: {
    email: "",
    userId: "",
    displayName: "",
    fullName: "",
    birthday: null,

  },
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload;
      state.email = data.email;
      state.userId = data.userId;
    },
    resetUserInfo: (state) => {
      state.email = "";
      state.uid = "";
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, resetUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer

