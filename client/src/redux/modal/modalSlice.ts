import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { openModal: false, deleteModal: false, idToDelete: "" };

interface IModal {
  openModal: boolean;
  deleteModal: boolean;
  idToDelete: string;
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMod(state) {
      state.openModal = true;
    },
    closeMod(state) {
      state.openModal = false;
    },
    deleteMod(state, action: PayloadAction<boolean>) {
      state.deleteModal = action.payload;
    },
    deletedId(state, action: PayloadAction<string>) {
      state.idToDelete = action.payload;
    },
  },
});

export const { openMod, closeMod, deleteMod, deletedId } = modalSlice.actions;
export default modalSlice.reducer;
export const getModalSelector = (store: { modal: IModal }): boolean =>
  store.modal.openModal;
export const getDeleteModSelector = (store: { modal: IModal }): boolean =>
  store.modal.deleteModal;
export const getDeletedIdSelector = (store: { modal: IModal }): string =>
  store.modal.idToDelete;
