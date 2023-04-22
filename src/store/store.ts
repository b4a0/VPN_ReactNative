import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vpnSlice from "./reducers/vpnSlice";
const rootReducer = combineReducers({
  vpn: vpnSlice,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
