import { ID, LoadingState } from '../common/base.types';

/**
 * Tipos relacionados con ciudades
 */

// Ciudad
export interface Ciudad {
  idCiudad: ID;
  idEstado: ID;
  ciudad: string;
}

// Ciudad para display
export interface CiudadDisplay {
  id: ID;
  nombre: string;
  estado: string;
}

// Estado de ciudades en Redux
export interface CiudadesState {
  isLoading: boolean;
  ciudades: Ciudad[];
  ciudad: Ciudad | Record<string, never>;
}

// Versión mejorada
export interface CiudadesStateV2 {
  loadingState: LoadingState;
  ciudades: Ciudad[];
  selectedCiudad: Ciudad | null;
  error: string | null;
}