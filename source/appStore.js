import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./redux/userInfoSlice";
export default configureStore({
    reducer: {
        userInfo: userInfoSlice,
    },
})