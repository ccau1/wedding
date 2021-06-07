import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  currentTheme: string;
  isDark: boolean;
}

const slice = createSlice({
  name: "_THEME_",
  initialState: { currentTheme: "default", isDark: false } as ThemeState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<{ theme: string }>) => {
      return { ...state, currentTheme: payload.theme };
    },
    setIsDark: (state, { payload }: PayloadAction<{ isDark: boolean }>) => {
      return { ...state, isDark: payload.isDark };
    },
  },
});

export const { actions: themeActions, reducer: themeReducer } = slice;

export default slice;
