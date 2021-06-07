import { resettableReducer } from "./utils";

import { deviceReducer } from "./device";
import { themeReducer } from "./theme";
import { constantReducer } from "./constant";
// define app start reset action. Dispatching this action will
// cause all reducers wrapped with this function to reset
const appStartReset = resettableReducer("APP_START_RESET");
const appLogoutReset = resettableReducer("_AUTH_LOGOUT_SUCCESS");

export default {
  constant: constantReducer,
  device: deviceReducer,
  theme: appLogoutReset(themeReducer),
};
