import { useState, useCallback } from 'react';
import { viaticoCalculator, ubicacionValidator } from '../../services/domain';

import type { Ciudad } from '../../types/catalogos/ciudad.types';
import type { Estado } from '../../types/catalogos/estado.types';
import type { Pais } from '../../types/catalogos/pais.types';
import { CalculoViaticoResult } from '../../types';

/**
 * Hook para manejar los cálculos de viáticos
 */
export const useViaticoCalculation = (
  ciudades: Ciudad[],
  estados: Estado[],
  paises: Pais[],
  nivelEmpleado: number
) => {
  const [calculoActual, setCalculoActual] = useState<CalculoViaticoResult | null>(null);

  const calcularViatico = useCallback(
    (destinoId: number, dias: number): CalculoViaticoResult | null => {
      if (destinoId === 0 || dias < 1) {
        setCalculoActual(null);
        return null;
      }

      // Buscar ciudad, estado y país
      const ciudad = ciudades.find(c => c.idCiudad === destinoId);
      if (!ciudad) {
        setCalculoActual(null);
        return null;
      }

      const estado = estados.find(e => e.idEstado === ciudad.idEstado);
      if (!estado) {
        setCalculoActual(null);
        return null;
      }

      const pais = paises.find(p => p.idPais === estado.idPais);
      if (!pais) {
        setCalculoActual(null);
        return null;
      }

      // Validar ubicación
      const validacion = ubicacionValidator.validar(ciudad, estado, pais);

      // Calcular viático
      const resultado = viaticoCalculator.calcular({
        dias,
        nivelEmpleado,
        fueraDelEstado: validacion.fueraDelEstado,
        fueraDelPais: validacion.fueraDelPais,
      });

      setCalculoActual(resultado);
      return resultado;
    },
    [ciudades, estados, paises, nivelEmpleado]
  );

  const resetCalculo = useCallback(() => {
    setCalculoActual(null);
  }, []);

  return {
    calculoActual,
    calcularViatico,
    resetCalculo,
  };
};