import { ID } from '../common/base.types';

/**
 * Tipos para reportes y formatos de viáticos
 */

// Formato de comisión completo (coincide exactamente con tu interfaz FormatoComisionReporte)
export interface FormatoComision {
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
  inforAct: string;
  importe: number;
  nombre: string;
  materno: string;
  paterno: string;
  descripcionPuesto: string;
  cdOrigen: string;
  cdDestino: string;
  quienLoComisiona: string;
  puestoQuienLoComisiona: string;
  edoOrigen: string;
  edoDestino: string;
  deptoDescripcion: string;
  inforResul: string;
}

// Alias para mantener el nombre original
export type FormatoComisionReporte = FormatoComision;

// Consecutivo de viático (coincide exactamente con tu interfaz)
export interface ViaticoConsecutivo {
  consecutivo: number;
}