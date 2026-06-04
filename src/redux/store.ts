import { combineSlices, configureStore } from "@reduxjs/toolkit";
import favouritesSlice from "./features/favourites/favouritesSlice";
import userSlice from "./features/user/userSlice";

const reducerSlices = combineSlices(favouritesSlice, userSlice);

const store = configureStore({
  reducer: reducerSlices
});

export { store }
type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
