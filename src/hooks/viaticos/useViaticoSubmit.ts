import { useCallback } from 'react';

import type { ViaticoPartida } from '../../types/viaticos/partida.types';
import type { Viatico, ViaticoFormData } from '../../types/viaticos/viatico.types';

import { useViaticosStore, usePartidasStore, useLocalData } from '../index';
import { CalculoViaticoResult } from '../../types';

interface SubmitHandlers {
  onSuccess?: (noViat: number) => void;
  onError?: (error: Error) => void;
  onReset?: () => void;
}

/**
 * Hook para manejar el envío del formulario de viáticos
 */
export const useViaticoSubmit = (
  empleadoId: number,
  calculoActual: CalculoViaticoResult | null,
  isModificarViatico: boolean,
  handlers?: SubmitHandlers
) => {
  const { startGetConsecutivo, startAddNewViatico, startUpdateViatico } = useViaticosStore();
  const { startAddNewPartidas, startUpdatePartidas } = usePartidasStore();
  const { noEmpleado: empCrea } = useLocalData();

  const submitViatico = useCallback(
    async (values: ViaticoFormData): Promise<void> => {
      // Validar que haya un cálculo
      if (!calculoActual) {
        throw new Error('Por favor seleccione un destino válido');
      }

      if (isModificarViatico) {
        // Actualizar viático existente
        const updateViatico: Viatico = {
          oficina: values.idoficina,
          ejercicio: values.ejercicio,
          noViat: values.noViat,
          fecha: new Date(values.fecha),
          noEmp: empleadoId,
          origenId: values.origenid,
          destinoId: values.destinoid,
          motivo: values.motivo.toUpperCase(),
          fechaSal: new Date(values.fechasal),
          fechaReg: new Date(values.fechareg),
          dias: values.dias,
          inforFecha: new Date(values.fechareg),
          inforAct: values.inforact.toUpperCase(),
          nota: 'nada',
          estatus: values.estatus,
          pol: 0,
          polMes: 0,
          caja: 0,
          fechaMod: new Date(values.fecha),
          cajaVale: 0,
          cajaRepo: 0,
          noEmpCrea: empCrea,
          inforResul: 'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE * VERSION WEB',
        };

        const updatePartida: ViaticoPartida = {
          partida: calculoActual.partida,
          ejercicio: values.ejercicio,
          importe: calculoActual.importe,
          noviat: values.noViat,
          oficina: values.idoficina,
        };

        await startUpdateViatico(updateViatico);
        await startUpdatePartidas(updatePartida);

        handlers?.onSuccess?.(values.noViat);
      } else {
        // Crear nuevo viático
        const consecutivo = await startGetConsecutivo(values.ejercicio, values.idoficina);
        const noViat = consecutivo + 1;

        const newViatico: Viatico = {
          oficina: values.idoficina,
          ejercicio: values.ejercicio,
          noViat,
          fecha: new Date(values.fecha),
          noEmp: empleadoId,
          origenId: values.origenid,
          destinoId: values.destinoid,
          motivo: values.motivo.toUpperCase(),
          fechaSal: new Date(values.fechasal),
          fechaReg: new Date(values.fechareg),
          dias: values.dias,
          inforFecha: new Date(values.fechareg),
          inforAct: values.inforact.toUpperCase(),
          nota: 'nada',
          estatus: 1,
          pol: 0,
          polMes: 0,
          caja: 0,
          fechaMod: new Date(values.fecha),
          cajaVale: 0,
          cajaRepo: 0,
          noEmpCrea: empCrea,
          inforResul: 'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE * VERSION WEB',
        };

        const newPartida: ViaticoPartida = {
          partida: calculoActual.partida,
          ejercicio: values.ejercicio,
          importe: calculoActual.importe,
          noviat: noViat,
          oficina: values.idoficina,
        };

        await startAddNewViatico(newViatico);
        await startAddNewPartidas(newPartida);

        handlers?.onSuccess?.(noViat);
      }
    },
    [
      calculoActual,
      isModificarViatico,
      empleadoId,
      empCrea,
      startGetConsecutivo,
      startAddNewViatico,
      startUpdateViatico,
      startAddNewPartidas,
      startUpdatePartidas,
      handlers,
    ]
  );

  return {
    submitViatico,
  };
};