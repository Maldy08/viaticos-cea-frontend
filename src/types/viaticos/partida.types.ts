import { ID } from '../common/base.types';

/**
 * Tipos relacionados con partidas de viáticos
 */

// Tipos de partida
export const TIPO_PARTIDA = {
  VIATICOS_EN_PAIS: 37501,
  VIATICOS_FUERA_PAIS: 37601,
} as const;

export type TipoPartida = typeof TIPO_PARTIDA[keyof typeof TIPO_PARTIDA];

// Descripción de partida
export const DESCRIPCION_PARTIDA: Record<TipoPartida, string> = {
  [TIPO_PARTIDA.VIATICOS_EN_PAIS]: 'VIATICOS EN EL PAIS',
  [TIPO_PARTIDA.VIATICOS_FUERA_PAIS]: 'VIATICOS FUERA DEL PAIS',
} as const;

// Partida de viático (coincide exactamente con tu interfaz ViaticosPart)
export interface ViaticoPartida {
  oficina: number;
  ejercicio: number;
  noviat: number;
  partida: number;
  importe: number;
}

// Alias para mantener el nombre original
export type ViaticosPart = ViaticoPartida;

// Partida para creación
export interface CreatePartidaData {
  partida: TipoPartida;
  ejercicio: number;
  importe: number;
  noviat: number;
  oficina: ID;
}

// Partida para actualización
export interface UpdatePartidaData extends CreatePartidaData {}