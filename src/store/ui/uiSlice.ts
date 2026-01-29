import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UiState, ViaticoModificar } from "../../types/ui/ui.types";
import type { ID } from "../../types/common/base.types";

const initialState: UiState = {
  isEmpleadosModalOpen: false,
  empleadoModalSelected: 0,
  isModificarViatico: false,
  ViaticoModificar: {
    oficina: 0,
    ejercicio: 0,
    noViat: 0
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onResetUiState: (state) => {
      state.isEmpleadosModalOpen = false;
      state.empleadoModalSelected = 0;
      state.isModificarViatico = false;
      state.ViaticoModificar = { oficina: 0, ejercicio: 0, noViat: 0 };
    },
    onOpenEmpleadosModal: (state) => {
      state.isEmpleadosModalOpen = true;
    },
    onCloseEmpleadosModal: (state) => {
      state.isEmpleadosModalOpen = false;
    },
    onSelectEmpleado: (state, action: PayloadAction<ID>) => {
      state.empleadoModalSelected = action.payload;
    },
    onModificarViatico: (state) => {
      state.isModificarViatico = !state.isModificarViatico;
    },
    onSelectModificarViatico: (state, action: PayloadAction<ViaticoModificar>) => {
      state.ViaticoModificar = action.payload;
    }
  }
});

export const { 
  onResetUiState,
  onOpenEmpleadosModal, 
  onCloseEmpleadosModal, 
  onSelectEmpleado,
  onModificarViatico, 
  onSelectModificarViatico,
} = uiSlice.actions;