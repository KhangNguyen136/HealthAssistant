import { createSlice } from '@reduxjs/toolkit'

export const authStateSlice = createSlice({
  name: 'authState',
  initialState: {
    loading: true,
    isLoggedIn: false,
  },
  reducers: {
    loggedIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('Logged in')
      state.isLoggedIn = true
      state.loading = false
    },
    loggedOut: (state) => {
      console.log('Logged out')
      state.isLoggedIn = false
      state.loading = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { loggedOut, loggedIn } = authStateSlice.actions

export default authStateSlice.reducer