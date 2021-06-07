import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConstantState {
  locale: string;
  updatedAt: Date;
  [code: string]: any;
}

const slice = createSlice({
  name: "_CONSTANT_",
  initialState: { locale: "en", updatedAt: new Date(0) } as ConstantState,
  reducers: {
    setConstants: (
      state,
      { payload }: PayloadAction<{ constants: any; locale: string }>,
    ) => {
      return {
        ...payload.constants,
        locale: payload.locale,
        updatedAt: new Date(),
      };
    },
  },
});

export const { actions: constantActions, reducer: constantReducer } = slice;

export default slice;
