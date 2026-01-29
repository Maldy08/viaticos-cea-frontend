import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Estado, EstadosState } from '../../types';


// Estado inicial
const estadoVacio = {} as Estado;
const estadosVacios: Estado[] = [];

const initialState: EstadosState = {
  isLoading: true,
  estados: estadosVacios,
  estado: estadoVacio
};

export const estadosSlice = createSlice({
  name: 'estados',
  initialState,
  reducers: {
    onGetEstados: (state, action: PayloadAction<Estado[]>) => {
      state.isLoading = false;
      state.estados = action.payload;
    },
    onGetEstadoById: (state, action: PayloadAction<Estado>) => {
      state.isLoading = false;
      state.estado = action.payload;
    }
  }
});

export const { onGetEstados, onGetEstadoById } = estadosSlice.actions;