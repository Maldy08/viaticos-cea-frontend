/**
 * DEPRECATED: Este archivo se mantiene solo por compatibilidad con código legacy
 * 
 * Por favor, usa los nuevos tipos segregados desde src/types en su lugar:
 * 
 * - Para auth: import { User, LoginCredentials } from '../types/auth'
 * - Para empleados: import { Empleado, VistaEmpleado } from '../types/empleados'
 * - Para viáticos: import { Viatico, ViaticoPartida } from '../types/viaticos'
 * - Para catálogos: import { Departamento, Oficina, Ciudad } from '../types/catalogos'
 * 
 * Este archivo será removido en una versión futura.
 */

// Re-exportar SOLO desde los nuevos tipos para mantener compatibilidad
export type { User } from '../types/auth/user.types';
export type { Departamento as Deptos } from '../types/catalogos/departamento.types';
export type { Viatico as Viaticos } from '../types/viaticos/viatico.types';
export type { ViaticoPartida as ViaticosPart } from '../types/viaticos/partida.types';
export type { ViaticoListItem as ListViaticos } from '../types/viaticos/viatico.types';
export type { Empleado } from '../types/empleados/empleado.types';
export type { VistaEmpleado as VistaEmpledo } from '../types/empleados/empleado.types';
export type { Oficina } from '../types/catalogos/oficina.types';
export type { Ciudad as Ciudades } from '../types/catalogos/ciudad.types';
export type { Estado as Estados } from '../types/catalogos/estado.types';
export type { Pais as Paises } from '../types/catalogos/pais.types';
export type { ViaticoConsecutivo } from '../types/viaticos/reporte.types';
export type { FormatoComision as FormatoComisionReporte } from '../types/viaticos/reporte.types';