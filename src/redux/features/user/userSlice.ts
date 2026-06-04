import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  user: string;
  notes: string[];
}

const initialState: state = {
  user: "",
  notes: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },
    addNote: (state, action: PayloadAction<string>) => {

      // dodaj id ovde
      state.notes.push(action.payload)
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectNotes: (state) => state.notes
  }
});

export const { signIn, addNote } = userSlice.actions;
export const { selectNotes, selectUser } = userSlice.selectors

export default userSlice