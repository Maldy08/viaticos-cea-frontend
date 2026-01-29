import { ID, LoadingState } from '../common/base.types';

/**
 * Tipos relacionados con países
 */

// País
export interface Pais {
  idPais: ID;
  pais: string;
}

// País para display
export interface PaisDisplay {
  id: ID;
  nombre: string;
}

// Estado de países en Redux
export interface PaisesState {
  isLoading: boolean;
  paises: Pais[];
  pais: Pais | Record<string, never>;
}

// Versión mejorada
export interface PaisesStateV2 {
  loadingState: LoadingState;
  paises: Pais[];
  selectedPais: Pais | null;
  error: string | null;
}