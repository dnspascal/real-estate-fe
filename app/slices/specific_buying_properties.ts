import { createSlice } from "@reduxjs/toolkit";

export interface ISpecificProperty{
    items:"",
}

const initialState: ISpecificProperty = {
    items:"",
};

const specificPropertySlice = createSlice({
    name: "specificPropertySlice",
    initialState,
    reducers:{
        specificProperties:(state, action)=>{
            state.items = action.payload;
        },
    },
});

export default specificPropertySlice.reducer;
export const {specificProperties} = specificPropertySlice.actions;