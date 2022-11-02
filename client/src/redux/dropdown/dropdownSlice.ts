import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { sortByAlphabet: false };

interface IDrop {
  sortByAlphabet: boolean;
}

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setSortAlphabet(state) {
      state.sortByAlphabet = true;
    },
    setSortDate(state) {
      state.sortByAlphabet = false;
    },
  },
});

export const { setSortAlphabet, setSortDate } = dropdownSlice.actions;
export default dropdownSlice.reducer;
export const getDropdownSelector = (store: { dropdown: IDrop }): boolean =>
  store.dropdown.sortByAlphabet;
