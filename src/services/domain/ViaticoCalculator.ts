
import { CalculoViaticoParams, CalculoViaticoResult, NivelEmpleado, TARIFAS_VIATICOS_2024, TarifasViaticos, TipoUbicacion } from '../../types';
import { TIPO_PARTIDA, DESCRIPCION_PARTIDA, TipoPartida } from '../../types/viaticos/partida.types';

/**
 * Servicio de dominio para cálculo de viáticos
 * Aplica las reglas de negocio para determinar importes y partidas
 */
export class ViaticoCalculator {
  constructor(private tarifas: TarifasViaticos = TARIFAS_VIATICOS_2024) {}

  /**
   * Calcula el importe total del viático
   */
  calcular(params: CalculoViaticoParams): CalculoViaticoResult {
    const { dias, nivelEmpleado, fueraDelEstado, fueraDelPais } = params;

    // Determinar tipo de ubicación
    const tipoUbicacion = this.determinarTipoUbicacion(fueraDelEstado, fueraDelPais);

    // Determinar categoría de nivel
    const nivelCategoria = this.determinarNivelCategoria(nivelEmpleado);

    // Obtener tarifa diaria
    const tarifaDiaria = this.obtenerTarifaDiaria(tipoUbicacion, nivelCategoria);

    // Calcular importe total
    const importe = tarifaDiaria * dias;

    // Determinar partida presupuestal
    const partida = this.determinarPartida(tipoUbicacion);

    return {
      importe,
      partida,
      descripcionPartida: DESCRIPCION_PARTIDA[partida],
      tipoUbicacion,
      nivelCategoria,
      tarifaDiaria,
    };
  }

  /**
   * Determina el tipo de ubicación del viático
   */
  private determinarTipoUbicacion(
    fueraDelEstado: boolean,
    fueraDelPais: boolean
  ): TipoUbicacion {
    if (fueraDelPais) {
      return TipoUbicacion.FUERA_PAIS;
    }
    if (fueraDelEstado) {
      return TipoUbicacion.FUERA_ESTADO;
    }
    return TipoUbicacion.DENTRO_ESTADO;
  }

  /**
   * Determina la categoría de nivel del empleado
   */
  private determinarNivelCategoria(nivel: number): NivelEmpleado {
    if (nivel < 17) {
      return NivelEmpleado.NIVEL_1_16;
    }
    if (nivel >= 17 && nivel <= 19) {
      return NivelEmpleado.NIVEL_17_19;
    }
    return NivelEmpleado.NIVEL_20_MAS;
  }

  /**
   * Obtiene la tarifa diaria según ubicación y nivel
   */
  private obtenerTarifaDiaria(
    ubicacion: TipoUbicacion,
    nivel: NivelEmpleado
  ): number {
    // Para viáticos fuera del país, usar tarifas de fuera del estado
    const tarifaBase = ubicacion === TipoUbicacion.DENTRO_ESTADO
      ? this.tarifas.dentroEstado
      : this.tarifas.fueraEstado;

    switch (nivel) {
      case NivelEmpleado.NIVEL_1_16:
        return tarifaBase.nivel1;
      case NivelEmpleado.NIVEL_17_19:
        return tarifaBase.nivel2;
      case NivelEmpleado.NIVEL_20_MAS:
        return tarifaBase.titular;
      default:
        return tarifaBase.nivel1;
    }
  }

  /**
   * Determina la partida presupuestal
   */
  private determinarPartida(ubicacion: TipoUbicacion): TipoPartida {
    return ubicacion === TipoUbicacion.FUERA_PAIS
      ? TIPO_PARTIDA.VIATICOS_FUERA_PAIS
      : TIPO_PARTIDA.VIATICOS_EN_PAIS;
  }

  /**
   * Actualiza las tarifas (útil para cuando cambien las tarifas)
   */
  actualizarTarifas(nuevasTarifas: TarifasViaticos): void {
    this.tarifas = nuevasTarifas;
  }

  /**
   * Obtiene las tarifas actuales
   */
  obtenerTarifas(): TarifasViaticos {
    return { ...this.tarifas };
  }
}

// Instancia singleton con tarifas por defecto
export const viaticoCalculator = new ViaticoCalculator();