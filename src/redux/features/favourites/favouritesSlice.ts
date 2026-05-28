import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  favs: string[]
}

const initialState: state = {
  favs: []
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<string>) => {
      state.favs.push(action.payload)
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter((fav) => fav !== action.payload)
    }
  },
  selectors: {
    getAll: (state) => state.favs,
    getSingle: (state, name) => state.favs.find(s => s === name)
  }
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export const { getAll, getSingle } = favouritesSlice.selectors;
export default favouritesSlice;