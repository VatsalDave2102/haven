import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";

interface InitialState {
  status: boolean;
  userData: Models.User<Models.Preferences> | null;
}

const initialState: InitialState = {
  status: false,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Models.User<Models.Preferences>>) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
