import { ID, LoadingState } from '../common/base.types';

/**
 * Tipos relacionados con departamentos
 */

// Departamento completo (coincide exactamente con tu interfaz Deptos)
export interface Departamento {
  id: number;
  idCea: number;
  idShpoa: number;
  descripcion: string;
  nivel: number;
  oficial: number;
  idReporta: number;
  agrupaPoa: number;
  meta: number;
  accion: number;
  prog: string;
  empRespon: number;
  agrupaDir: number;
}

// Alias para mantener el nombre original
export type Deptos = Departamento;

// Departamento para display (simplificado)
export interface DepartamentoDisplay {
  id: ID;
  descripcion: string;
  nivel: number;
}

// Estado de departamentos en Redux
export interface DepartamentosState {
  isLoadingDeptos: boolean;
  deptos: Departamento[];
  depto: Departamento | Record<string, never>;
}

// Versión mejorada
export interface DepartamentosStateV2 {
  loadingState: LoadingState;
  departamentos: Departamento[];
  selectedDepartamento: Departamento | null;
  error: string | null;
}