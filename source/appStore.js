import { configureStore } from "@reduxjs/toolkit";
import authStateReducer from "./redux/authStateSlice";
export default configureStore({
    reducer: {
        authState: authStateReducer,
    },
})