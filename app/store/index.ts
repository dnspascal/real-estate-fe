import { configureStore } from "@reduxjs/toolkit";
import firstSlice from "../slices/first_slice";
import property_slice from "../slices/property_slice";
import specificPropertySlice from "../slices/specific_buying_properties";

export const store = configureStore({
  reducer: {
    signup: firstSlice,
    property: property_slice,
    specificProperties: specificPropertySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
