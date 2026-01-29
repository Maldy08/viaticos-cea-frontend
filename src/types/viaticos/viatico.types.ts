import { ID, DateString } from '../common/base.types';

/**
 * Tipos relacionados con viáticos
 */

// Estados posibles de un viático
export type EstatusViatico = 1 | 2 | 3 | 4 | 9;

export const ESTATUS_VIATICO = {
  CREADO: 1 as EstatusViatico,
  PAGADO_CC: 2 as EstatusViatico,
  REGISTRADO_CONT: 3 as EstatusViatico,
  PAGADO_CONT: 4 as EstatusViatico,
  CANCELADO: 9 as EstatusViatico,
} as const;

// Viático completo (coincide exactamente con tu interfaz Viaticos)
export interface Viatico {
  oficina: number;
  ejercicio: number;
  noViat: number;
  fecha: Date;
  noEmp: number;
  origenId: number;
  destinoId: number;
  motivo: string;
  fechaSal: Date;
  fechaReg: Date;
  dias: number;
  inforFecha: Date;
  inforAct: string;
  nota: string;
  estatus: number;
  fechaMod: Date;
  pol: number;
  polMes: number;
  caja: number;
  cajaVale: number;
  cajaRepo: number;
  noEmpCrea: number;
  inforResul: string;
  lugarTrab?: number;
}

// Alias para mantener el nombre original
export type Viaticos = Viatico;

// Viático para listado (ACTUALIZADO con campos faltantes)
export interface ViaticoListItem {
  viatico: number;
  fecha: string;
  origen: string;
  destino: string;
  motivo: string;
  salida: string;
  regreso: string;
  estatus: string;
  // Campos adicionales necesarios para el componente TableListadoViaticos
  oficina: number;
  ejercicio: number;
  editar: boolean;
}

// Alias para mantener el nombre original
export type ListViaticos = ViaticoListItem;

// Identificador único de viático
export interface ViaticoId {
  oficina: ID;
  ejercicio: number;
  noViat: number;
}

// Viático para formulario de captura
export interface ViaticoFormData {
  idoficina: ID;
  ejercicio: number;
  fecha: Date;
  estatus: number;
  noViat: number;
  fechasal: Date;
  fechareg: Date;
  dias: number;
  origenid: ID;
  destinoid: ID;
  motivo: string;
  inforact: string;
  lugartrab: ID;
}

// Viático para creación (datos mínimos necesarios)
export interface CreateViaticoData {
  oficina: ID;
  ejercicio: number;
  fecha: Date;
  noEmp: ID;
  origenId: ID;
  destinoId: ID;
  motivo: string;
  fechaSal: Date;
  fechaReg: Date;
  dias: number;
  inforAct: string;
  lugarTrab: ID;
  noEmpCrea: ID;
}

// Viático para actualización
export interface UpdateViaticoData extends ViaticoId {
  fecha: Date;
  origenId: ID;
  destinoId: ID;
  motivo: string;
  fechaSal: Date;
  fechaReg: Date;
  dias: number;
  inforAct: string;
  inforFecha: Date;
  fechaMod: Date;
  inforResul: string;
}