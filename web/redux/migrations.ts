import { MigrationManifest } from "redux-persist/es/types";
import { RootState } from "./store";

export default {
  0: (state) => {
    return {
      ...state,
    };
  },
} as MigrationManifest;
