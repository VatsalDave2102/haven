import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import viewReducer from "./viewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    view: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
