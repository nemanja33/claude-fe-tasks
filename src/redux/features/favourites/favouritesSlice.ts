import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../hooks/users/useUsers";
import { RootState } from "../../store";

interface state {
  favs: number[]
}

const initialState: state = {
  favs: []
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<number>) => {
      state.favs.push(action.payload)
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.favs = state.favs.filter((fav) => fav !== action.payload)
    }
  }
});

const selectAll = (state: RootState) => state.favourites
const selectUsers = (state: RootState, users: User[]) => users

export const selectFavoutires = createSelector(
  [
    selectAll,
    selectUsers
  ],
  (state, users) => users.filter((user) => state.favs.includes(user.id))
);
export const selectSingle = (state: RootState, id: number) => state.favourites.favs.find(s => s === id)

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice;