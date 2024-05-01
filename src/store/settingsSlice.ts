import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

type LocaleType = { value: string; label: string };

export interface SettingsState {
  errors: number;
  seed: string;
  locale: LocaleType;
}

const randomString = () => Math.random().toString(36).substring(2);

const initialState: SettingsState = {
  errors: 0,
  seed: randomString(),
  locale: { value: "en", label: "English" },
};

export const settingsSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<number>) => {
      state.errors = action.payload;
    },
    setSeed: (state, action: PayloadAction<string>) => {
      state.seed = action.payload;
    },
    generateSeed: (state) => {
      state.seed = randomString();
    },
    setLocale: (state, action: PayloadAction<LocaleType>) => {
      state.locale = action.payload;
    },
  },
});

export const { setErrors, setSeed, setLocale, generateSeed } =
  settingsSlice.actions;

export default settingsSlice.reducer;

export const settingsSelectors = {
  getErrors: (state: RootState) => {
    return state.settings.errors;
  },
  getSeed: (state: RootState) => {
    return state.settings.seed;
  },
  getLocale: (state: RootState) => {
    return state.settings.locale;
  },
};
