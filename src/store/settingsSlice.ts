import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/store";

type LocaleType = { value: string; label: string };

export interface SettingsState {
  errors: number;
  seed: string;
  locale: LocaleType;
  skip: number;
}

const randomString = () => Math.random().toString(36).substring(2);

const initialState: SettingsState = {
  skip: 0,
  errors: 0,
  seed: "0",
  locale: { value: "en", label: "English" },
};

export const settingsSlice = createSlice({
  name: "settings",
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
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },
});

export const { setErrors, setSeed, setLocale, generateSeed, setSkip } =
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
  getSkip: (state: RootState) => {
    return state.settings.skip;
  },
  getParams: (state: RootState) => {
    return {
      seed: state.settings.seed,
      region: state.settings.locale.value,
      mistakes: state.settings.errors,
    };
  },
};
