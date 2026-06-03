import { combineSlices, configureStore } from "@reduxjs/toolkit";
import favouritesSlice from "./features/favourites/favouritesSlice";

const reducerSlices = combineSlices(favouritesSlice);

const store = configureStore({
  reducer: reducerSlices
});

export { store }
type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
