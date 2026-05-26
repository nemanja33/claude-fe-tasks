import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favs: []
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {}
});


export default favouritesSlice;