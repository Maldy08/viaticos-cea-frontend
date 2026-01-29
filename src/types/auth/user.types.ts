import { ID } from '../common/base.types';

/**
 * Tipos relacionados con el usuario
 */

// Usuario completo (coincide exactamente con tu interfaz original)
export interface User {
  usuario: number;
  login: string;
  pass: string;
  activo: boolean;
  depto: number;
  noEmpleado: number;
  viaticos: boolean;
  viaticosNivel: number;
  deptoDescripcion: string;
  nombreCompleto: string;
  idPue: number;
  descripcion: string;
  municipio: number;
  oficina: number;
}

// Datos básicos del usuario (para respuestas de API)
export interface UserData {
  activo: boolean;
  depto: ID;
  noEmpleado: ID;
  viaticos: boolean;
  viaticosNivel: number;
  deptoDescripcion: string;
  nombreCompleto: string;
  idPue: ID;
  descripcionPuesto: string;
  municipio: ID;
  oficina: ID;
}

// Datos del usuario almacenados localmente (para manejar inconsistencias de mayúsculas)
export interface LocalUserData {
  activo?: boolean;
  Activo?: boolean;
  depto?: ID;
  Depto?: ID;
  deptoDescripcion?: string;
  DeptoDescripcion?: string;
  descripcionPuesto?: string;
  DescripcionPuesto?: string;
  idPue?: ID;
  IdPue?: ID;
  IdPuesto?: ID;
  noEmpleado?: ID;
  NoEmpleado?: ID;
  nombreCompleto?: string;
  NombreCompleto?: string;
  viaticos?: boolean;
  Viaticos?: boolean;
  viaticosNivel?: number;
  ViaticosNivel?: number;
  municipio?: ID;
  Municipio?: ID;
  oficina?: ID;
  Oficina?: ID;
}