import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;