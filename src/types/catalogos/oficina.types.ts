import { ID, LoadingState } from '../common/base.types';

/**
 * Tipos relacionados con oficinas
 */

// Oficina
export interface Oficina {
  idOfi: ID;
  nombre: string;
  rutaTrans: string;
}

// Oficina para display
export interface OficinaDisplay {
  id: ID;
  nombre: string;
}

// Estado de oficinas en Redux
export interface OficinasState {
  isLoading: boolean;
  oficinas: Oficina[];
  oficina: Oficina | Record<string, never>;
  errorMessage: string | undefined;
}

// Versión mejorada
export interface OficinasStateV2 {
  loadingState: LoadingState;
  oficinas: Oficina[];
  selectedOficina: Oficina | null;
  error: string | null;
}