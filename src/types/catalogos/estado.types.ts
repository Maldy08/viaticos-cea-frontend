import { ID, LoadingState } from '../common/base.types';

/**
 * Tipos relacionados con estados
 */

// Estado (entidad federativa)
export interface Estado {
  idEstado: ID;
  idPais: ID;
  estado: string;
}

// Estado para display
export interface EstadoDisplay {
  id: ID;
  nombre: string;
  pais: string;
}

// Estado de estados en Redux
export interface EstadosState {
  isLoading: boolean;
  estados: Estado[];
  estado: Estado | Record<string, never>;
}

// Versión mejorada
export interface EstadosStateV2 {
  loadingState: LoadingState;
  estados: Estado[];
  selectedEstado: Estado | null;
  error: string | null;
}