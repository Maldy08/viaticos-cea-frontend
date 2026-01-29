import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pais, PaisesState } from "../../types";


// Estado inicial
const paisVacio = {} as Pais;
const paisesVacios: Pais[] = [];

const initialState: PaisesState = {
  isLoading: true,
  paises: paisesVacios,
  pais: paisVacio,
};

export const paisesSlice = createSlice({
  name: 'paises',
  initialState,
  reducers: {
    onListPaises: (state, action: PayloadAction<Pais[]>) => {
      state.isLoading = false;
      state.paises = action.payload;
    },
  },
});

export const { onListPaises } = paisesSlice.actions;