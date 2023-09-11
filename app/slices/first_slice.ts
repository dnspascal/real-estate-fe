import { createSlice } from "@reduxjs/toolkit";

export interface ISignUP {
  values: string;
}

const initialState: ISignUP = {
  values: "",
};

const firstSlice = createSlice({
  name: "firstSlice",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.values = action.payload;
    },
  },
});

export default firstSlice.reducer;
export const { signup } = firstSlice.actions;
