import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  darkMode: boolean | undefined;
}

const initialState: InitialState = {
  darkMode: undefined,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = viewSlice.actions;
export default viewSlice.reducer;
