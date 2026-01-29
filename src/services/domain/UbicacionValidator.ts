import type { ID } from '../../types/common/base.types';
import type { Ciudad } from '../../types/catalogos/ciudad.types';
import type { Estado } from '../../types/catalogos/estado.types';
import type { Pais } from '../../types/catalogos/pais.types';

/**
 * Resultado de validación de ubicación
 */
export interface ValidacionUbicacion {
  fueraDelEstado: boolean;
  fueraDelPais: boolean;
  estadoId: ID;
  paisId: ID;
}

/**
 * Servicio para validar y determinar ubicaciones
 */
export class UbicacionValidator {
  // IDs de estados de Baja California
  private readonly ESTADOS_BAJA_CALIFORNIA = [2]; // ID del estado de BC
  
  // Ciudades principales de BC que NO se consideran fuera del estado
  private readonly CIUDADES_LOCALES_BC = [1, 2, 3, 4, 5, 6]; // IDs de ciudades principales

  // ID de México
  private readonly PAIS_MEXICO = 1;

  /**
   * Valida si un destino está fuera del estado o del país
   */
  validar(
    ciudadDestino: Ciudad,
    estado: Estado,
    pais: Pais
  ): ValidacionUbicacion {
    const fueraDelPais = this.esFueraDelPais(pais.idPais);
    const fueraDelEstado = this.esFueraDelEstado(
      ciudadDestino.idCiudad,
      estado.idEstado,
      fueraDelPais
    );

    return {
      fueraDelEstado,
      fueraDelPais,
      estadoId: estado.idEstado,
      paisId: pais.idPais,
    };
  }

  /**
   * Determina si está fuera del país
   */
  private esFueraDelPais(paisId: ID): boolean {
    return paisId !== this.PAIS_MEXICO;
  }

  /**
   * Determina si está fuera del estado
   */
  private esFueraDelEstado(
    ciudadId: ID,
    estadoId: ID,
    fueraDelPais: boolean
  ): boolean {
    // Si está fuera del país, automáticamente está fuera del estado
    if (fueraDelPais) {
      return true;
    }

    // Si el estado no es Baja California, está fuera del estado
    if (!this.ESTADOS_BAJA_CALIFORNIA.includes(estadoId)) {
      return true;
    }

    // Si es BC pero la ciudad no está en la lista de locales, está fuera
    if (!this.CIUDADES_LOCALES_BC.includes(ciudadId)) {
      return false; // Ciudades dentro de BC
    }

    return false; // Está dentro del estado
  }

  /**
   * Valida si un destino es válido (diferente al origen)
   */
  validarDestinoDistintoOrigen(origenId: ID, destinoId: ID): boolean {
    return origenId !== destinoId;
  }
}

// Instancia singleton
export const ubicacionValidator = new UbicacionValidator();