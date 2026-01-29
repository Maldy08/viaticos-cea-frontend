import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ViaticoPartida } from "../../types/viaticos/partida.types";

// Estado de partidas
export interface PartidasState {
  isLoading: boolean;
  partidas: ViaticoPartida | Record<string, never>;
}

// Estado inicial
const partidasVacias = {} as ViaticoPartida;

const initialState: PartidasState = {
  isLoading: true,
  partidas: partidasVacias
};

export const partidasSlice = createSlice({
  name: 'partidas',
  initialState,
  reducers: {
    onAddNew: (state, action: PayloadAction<ViaticoPartida>) => {
      state.isLoading = false;
      state.partidas = action.payload;
    },
  }
});

export const { onAddNew } = partidasSlice.actions;