import { LoadingState } from '../common/base.types';
import { Empleado, VistaEmpleado } from './empleado.types';

/**
 * Estado de empleados en Redux
 */

export interface EmpleadosState {
  isLoading: boolean;
  empleados: Empleado[];
  empleado: VistaEmpleado | Record<string, never>;
  errorMessage: string;
}

// Versión mejorada con LoadingState
export interface EmpleadosStateV2 {
  loadingState: LoadingState;
  empleados: Empleado[];
  selectedEmpleado: VistaEmpleado | null;
  error: string | null;
}