import { ID } from '../common/base.types';

/**
 * Tipos relacionados con empleados
 */

// Empleado completo (coincide exactamente con tu interfaz)
export interface Empleado {
  idEmpleado: number;
  nombre: string;
  paterno: string;
  materno: string;
  nivel: number;
  depto: number;
  obra: number;
  deptoPpto: number;
  municipio: number;
  activo: string;
  lugartrab: number;
}

// Vista de empleado (coincide exactamente con tu interfaz VistaEmpledo)
export interface VistaEmpleado {
  activo: string;
  empleado: number;
  paterno: string;
  materno: string;
  nombre: string;
  idPue: number;
  descripcionPuesto: string;
  deptoue: number;
  descripcionDepto: string;
  deptocomi: number;
  nombreCompleto: string;
  municipio: number;
  oficina: number;
  nivel: number;
  lugartrab: number;
}

// Alias para mantener el nombre original
export type VistaEmpledo = VistaEmpleado;

// Empleado base (datos mínimos)
export interface EmpleadoBase {
  idEmpleado: ID;
  nombre: string;
  paterno: string;
  materno: string;
}

// Empleado para formularios (datos editables)
export interface EmpleadoFormData {
  nombre: string;
  paterno: string;
  materno: string;
  nivel: number;
  depto: ID;
  municipio: ID;
  activo: boolean;
}

// Empleado para display (tabla/listado)
export interface EmpleadoDisplay {
  empleadoId: ID;
  nombre: string;
  paterno: string;
  materno: string;
  nombreCompleto: string;
  puesto?: string;
  departamento?: string;
  activo: boolean;
}

// Filtros de búsqueda de empleados
export interface EmpleadoFilters {
  depto?: ID;
  deptoPpto?: ID;
  municipio?: ID;
  activo?: boolean;
  searchTerm?: string;
}