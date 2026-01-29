import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Viatico, ViaticoListItem } from '../../types/viaticos/viatico.types';
import type { ViaticoConsecutivo, FormatoComision } from '../../types/viaticos/reporte.types';

// Estado de viáticos
export interface ViaticosState {
  isLoading: boolean;
  listviaticos: ViaticoListItem[];
  viatico: Viatico | Record<string, never>;
  errorMessage: string | undefined;
  consecutivo: ViaticoConsecutivo | Record<string, never>;
  formatoComision: FormatoComision | Record<string, never>;
}

// Estado inicial
const viaticoVacio = {} as Viatico;
const consecutivoVacio = {} as ViaticoConsecutivo;
const formatoComisionVacio = {} as FormatoComision;

const initialState: ViaticosState = {
  isLoading: true,
  listviaticos: [],
  viatico: viaticoVacio,
  errorMessage: undefined,
  consecutivo: consecutivoVacio,
  formatoComision: formatoComisionVacio
};

export const viaticosSlice = createSlice({
  name: 'viaticos',
  initialState,
  reducers: {
    onListViaticosByEmpleado: (state, action: PayloadAction<ViaticoListItem[]>) => {
      state.isLoading = false;
      state.listviaticos = action.payload;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    onGetConsecutivo: (state, action: PayloadAction<ViaticoConsecutivo>) => {
      state.isLoading = false;
      state.consecutivo = action.payload;
    },
    onAddNewViatico: (state, action: PayloadAction<Viatico>) => {
      state.isLoading = false;
      state.viatico = viaticoVacio;
    },
    onGetFormatoComision: (state, action: PayloadAction<FormatoComision>) => {
      state.isLoading = false;
      state.formatoComision = action.payload;
    },
    onGetViaticoEjercicioOficinaNoviat: (state, action: PayloadAction<Viatico>) => {
      state.isLoading = false;
      state.viatico = action.payload;
    },
    onUpdateViatico: (state, action: PayloadAction<Viatico>) => {
      state.isLoading = false;
      state.viatico = viaticoVacio;
    },
    onResetData: (state) => {
      state.listviaticos = [];
      state.formatoComision = formatoComisionVacio;
      state.viatico = viaticoVacio;
      state.consecutivo = consecutivoVacio;
    },
  }
});

export const { 
  onListViaticosByEmpleado, 
  onGetConsecutivo,
  onError, 
  onAddNewViatico, 
  onGetFormatoComision, 
  onGetViaticoEjercicioOficinaNoviat,
  onUpdateViatico,
  onResetData,
} = viaticosSlice.actions;