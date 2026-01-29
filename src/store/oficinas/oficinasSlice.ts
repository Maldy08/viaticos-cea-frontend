import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Oficina, OficinasState } from "../../types";


// Estado inicial
const oficinaVacia = {} as Oficina;
const oficinasVacias: Oficina[] = [];

const initialState: OficinasState = {
  isLoading: true,
  oficinas: oficinasVacias,
  oficina: oficinaVacia,
  errorMessage: undefined
};

export const oficinasSlice = createSlice({
  name: 'oficinas',
  initialState,
  reducers: {
    onListOficinas: (state, action: PayloadAction<Oficina[]>) => {
      state.isLoading = false;
      state.oficinas = action.payload;
    }
  }
});

export const { onListOficinas } = oficinasSlice.actions;