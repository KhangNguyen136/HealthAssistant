import { createSlice } from '@reduxjs/toolkit'
const initValue = {
  email: "",
  userId: "",
  displayName: "",
  fullName: "",
  phoneNumber: "",
  birthday: null,
}
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initValue,
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload;
      console.log('Set redux data', data);
      state.email = data.email;
      state.userId = data.userId;
      state.displayName = data.displayName;
      state.fullName = data.fullName;
      state.phoneNumber = data.phoneNumber;
      state.birthday = data.birthday;
    },
    resetUserInfo: (state) => {
      state = initValue
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, resetUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer

