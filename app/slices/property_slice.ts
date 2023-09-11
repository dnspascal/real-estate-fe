import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  category: number | null;
  type: number | null;
  price: number | null;
  conditions: string;
  address: object;
  estate_name: string;
  utilities: string;
  is_for_rent: boolean;
  description: string;
  property_pictures: Array<File> | null;
  attributes: "";
}
const initialState: IProduct = {
  category: null,
  type: null,
  price: null,
  conditions: "",
  address: {},
  estate_name: "",
  utilities: "",
  is_for_rent: false,
  description: "",
  property_pictures: null,
  attributes: "",
};

const productSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    addToProduct: (state, action: PayloadAction<Partial<IProduct>>) => {
     return {...state,...action.payload}
    },
  },
});

export const {addToProduct} = productSlice.actions
export default productSlice.reducer