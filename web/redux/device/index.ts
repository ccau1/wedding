import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState extends DbDevice {}

const slice = createSlice({
  name: "_DEVICE_",
  initialState: {} as DeviceState,
  reducers: {
    setDevice: (state, { payload }: PayloadAction<DbDevice>) => {
      return { ...state, ...payload };
    },
  },
});

export const { actions: deviceActions, reducer: deviceReducer } = slice;

export default slice;
