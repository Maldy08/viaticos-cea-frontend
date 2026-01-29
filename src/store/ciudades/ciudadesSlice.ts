import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ciudad, CiudadesState } from "../../types";

// Estado inicial
const ciudadVacia = {} as Ciudad;
const ciudadesVacias: Ciudad[] = [];

const initialState: CiudadesState = {
  isLoading: true,
  ciudades: ciudadesVacias,
  ciudad: ciudadVacia,
};

export const ciudadesSlice = createSlice({
  name: 'ciudades',
  initialState,
  reducers: {
    onListCiudades: (state, action: PayloadAction<Ciudad[]>) => {
      state.isLoading = false;
      state.ciudades = action.payload;
    },
    onGetCiudadById: (state, action: PayloadAction<Ciudad>) => {
      state.isLoading = false;
      state.ciudad = action.payload;
    }
  }
});

export const { onListCiudades, onGetCiudadById } = ciudadesSlice.actions;