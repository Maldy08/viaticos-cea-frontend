import type { TipoPartida } from './partida.types';

/**
 * Tipos relacionados con cálculo de viáticos
 */

// Niveles de empleado para cálculo
export enum NivelEmpleado {
  NIVEL_1_16 = 'NIVEL_1_16',      // Niveles 1-16
  NIVEL_17_19 = 'NIVEL_17_19',    // Niveles 17-19
  NIVEL_20_MAS = 'NIVEL_20_MAS',  // Nivel 20 o más (Titulares)
}

// Tipos de ubicación para viáticos
export enum TipoUbicacion {
  DENTRO_ESTADO = 'DENTRO_ESTADO',
  FUERA_ESTADO = 'FUERA_ESTADO',
  FUERA_PAIS = 'FUERA_PAIS',
}

// Tarifas de viáticos (pueden venir de configuración o BD)
export interface TarifasViaticos {
  dentroEstado: {
    nivel1: number;
    nivel2: number;
    titular: number;
  };
  fueraEstado: {
    nivel1: number;
    nivel2: number;
    titular: number;
  };
}

// Parámetros para calcular viático
export interface CalculoViaticoParams {
  dias: number;
  nivelEmpleado: number;
  fueraDelEstado: boolean;
  fueraDelPais: boolean;
}

// Resultado del cálculo
export interface CalculoViaticoResult {
  importe: number;
  partida: TipoPartida;
  descripcionPartida: string;
  tipoUbicacion: TipoUbicacion;
  nivelCategoria: NivelEmpleado;
  tarifaDiaria: number;
}

// Configuración de tarifas (valores actuales del sistema)
export const TARIFAS_VIATICOS_2024: TarifasViaticos = {
  dentroEstado: {
    nivel1: 270,    // Niveles 1-16
    nivel2: 300,    // Niveles 17-19
    titular: 350,   // Nivel 20+
  },
  fueraEstado: {
    nivel1: 400,    // Niveles 1-16
    nivel2: 500,    // Niveles 17-19
    titular: 600,   // Nivel 20+
  },
};