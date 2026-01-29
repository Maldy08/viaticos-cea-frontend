import { useState, useEffect } from 'react';
import type { Viatico, ViaticoFormData } from '../../types/viaticos/viatico.types';

import type { ID } from '../../types/common/base.types';

/**
 * Hook para manejar el estado del formulario de viáticos
 */
export const useViaticoForm = (
  viatico: Viatico | Record<string, never>,
  empleadoOficina: number,
  empleadoMunicipio: number,
  empleadoLugarTrab: number
) => {
  const [isModificarViatico, setIsModificarViatico] = useState(false);
  const [initialValues, setInitialValues] = useState<ViaticoFormData>({} as ViaticoFormData);

  useEffect(() => {
    const ejercicio = +localStorage.getItem('ejercicio')!;

    if (Object.keys(viatico).length !== 0) {
      // Modo edición
      setInitialValues({
        idoficina: viatico.oficina,
        ejercicio: viatico.ejercicio,
        fecha: new Date(viatico.fecha),
        estatus: viatico.estatus,
        noViat: viatico.noViat,
        fechasal: new Date(viatico.fechaSal),
        fechareg: new Date(viatico.fechaReg),
        dias: viatico.dias,
        origenid: empleadoMunicipio,
        destinoid: viatico.destinoId,
        motivo: viatico.motivo,
        inforact: viatico.inforAct,
        lugartrab: viatico.oficina,
      });
      setIsModificarViatico(true);
    } else {
      // Modo creación
      let origenid = 1;
      switch (empleadoOficina) {
        case 1:
        case 2:
        case 5:
          origenid = 1;
          break;
        case 3:
          origenid = 2;
          break;
      }

      setInitialValues({
        idoficina: empleadoOficina,
        ejercicio,
        fecha: new Date(),
        estatus: 0,
        noViat: 0,
        fechasal: new Date(),
        fechareg: new Date(),
        dias: 1,
        origenid,
        destinoid: 0,
        motivo: '',
        inforact: '',
        lugartrab: empleadoLugarTrab,
      });
      setIsModificarViatico(false);
    }
  }, [viatico, empleadoOficina, empleadoMunicipio, empleadoLugarTrab]);

  return {
    initialValues,
    isModificarViatico,
  };
};