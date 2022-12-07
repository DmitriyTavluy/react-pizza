import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStore } from "../store";
import { CartItem } from "./cartSlice";

// type FetchPizzasArgs = {
//   orderBy: string;
//   sortBy: string;
//   categoryBy: string;
//   pageCount: string;
//   searchValue: string;
// }

type Pizza = {
  id: string;
  title: string;
  types: number[];
  price: number;
  count: number;
  imageUrl: string;
  sizes: number[];
};

interface pizzasSliceState {
  pizzas: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: pizzasSliceState = {
  pizzas: [],
  status: "loading", // loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizzas/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { orderBy, sortBy, categoryBy, pageCount, searchValue } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62f17dabb1098f1508019344.mockapi.io/items?search=${searchValue}&${categoryBy}&sortBy=${sortBy}&order=${orderBy}&page=${pageCount}&limit=8`
    );
    return data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.pizzas = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const selectPizzas = (state: RootStore) => state.pizzasSlice;

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
