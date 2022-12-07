import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../store";

type SortType = {
  name: string;
  sort: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sortType: SortType;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  pageCount: 1,
  sortType: {
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    /*setFilters(state, action) {
      state.sortType.sort = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.pageCount = Number(action.payload.pageCount);
    },*/
  },
});

export const selectFilterSortType = (state: RootStore) =>
  state.filterSlice.sortType;
export const selectFilter = (state: RootStore) => state.filterSlice;

export const { setCategoryId, setSortType, setPageCount, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
