import logger from "redux-logger";
import sagas, { runSaga } from "./sagas";
import AsyncStorage from "@react-native-community/async-storage";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  createMigrate,
} from "redux-persist";
import reducers from "./reducers";
import migrations from "./migrations";
import { batchDispatchMiddleware } from "redux-batched-actions";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// define persist config
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: require("redux-persist/lib/storage").default,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
};

// generate combined reducers
const rootReducer = combineReducers(reducers);

// setup reducer with persist config
const AppReducer = persistReducer(persistConfig, rootReducer);

// create a persistor and store
export const store = configureStore({
  reducer: AppReducer,
  middleware: [
    sagas,
    // logger,
    batchDispatchMiddleware,
  ],
});

// create persist handler
export const persistor = persistStore(store);

// define root state
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

// run saga middleware
runSaga();
