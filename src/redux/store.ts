import { Action, combineSlices, configureStore, ThunkAction } from "@reduxjs/toolkit";
import favouritesSlice from "./features/favourites/favouritesSlice";

const reducerSlices = combineSlices(favouritesSlice);

const store = configureStore({
  reducer: reducerSlices
});

export { store }
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>