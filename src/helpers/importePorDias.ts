/**
 * @deprecated Use ViaticoCalculator from services/domain instead
 * Este archivo se mantiene solo por compatibilidad
 */

import { viaticoCalculator } from '../services/domain';

export const importePorDias = (
  dias: number,
  nivelEmpleado: number,
  fueraDelEstado: boolean
): number => {
  console.warn('importePorDias is deprecated. Use ViaticoCalculator instead.');
  
  const resultado = viaticoCalculator.calcular({
    dias,
    nivelEmpleado,
    fueraDelEstado,
    fueraDelPais: false, // El helper antiguo no manejaba fuera del país
  });

  return resultado.importe;
};