import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";


type Note = {
  id: string,
  content: string,
};

interface state {
  user: string;
  notes: Note[];
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
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      },
      prepare: (note: string) => ({
        payload: { id: nanoid(), content: note },
      }),
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectNotes: (state) => state.notes
  }
});

export const { signIn, addNote } = userSlice.actions;
export const { selectNotes, selectUser } = userSlice.selectors

export default userSlice