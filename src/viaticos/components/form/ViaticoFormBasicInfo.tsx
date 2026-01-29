import { Field } from 'formik';
import DatePicker from 'react-datepicker';
import { DateUtils } from '../../../services/domain';
import type { Oficina } from '../../../types/catalogos/oficina.types';
import type { ID } from '../../../types/common/base.types';

interface Props {
  oficinas: Oficina[];
  isLoadingOficinas: boolean;
  ejercicio: number;
  fecha: Date;
  empleadoId: ID;
  noViat: number;
  isSubmitting: boolean;
  onFechaChange: (date: Date) => void;
}

/**
 * Información básica del viático (oficina, ejercicio, fecha, empleado, número)
 */
export const ViaticoFormBasicInfo = ({
  oficinas,
  isLoadingOficinas,
  ejercicio,
  fecha,
  empleadoId,
  noViat,
  isSubmitting,
  onFechaChange,
}: Props) => {
  return (
    <div className="row gx-4">
      <div className="col">
        <div className="form-floating">
          <Field
            name="idoficina"
            as="select"
            disabled={true}
            className="form-select text-uppercase"
          >
            {!isLoadingOficinas &&
              oficinas.map(({ idOfi, nombre }) => (
                <option key={idOfi} value={idOfi}>
                  {nombre}
                </option>
              ))}
          </Field>
          <label htmlFor="idoficina">Oficina</label>
        </div>
      </div>

      <div className="col-md-2">
        <div className="form-floating">
          <Field disabled name="ejercicio" type="text" className="form-control" />
          <label htmlFor="ejercicio">Ejercicio</label>
        </div>
      </div>

      <div className="col">
        <div className="form-floating">
          <div className="p-0">
            <label className="fecha">Fecha</label>
            <DatePicker
              name="fecha"
              title="fecha"
              className="form-control"
              dateFormat="dd/MM/yyyy"
              disabled={isSubmitting}
              selected={fecha}
              minDate={DateUtils.obtenerInicioEjercicio(ejercicio)}
              maxDate={DateUtils.obtenerFinEjercicio(ejercicio)}
              onChange={onFechaChange}
            />
          </div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="form-floating">
          <span className="form-control">{empleadoId}</span>
          <label htmlFor="empleado2">Empleado</label>
        </div>
      </div>

      <div className="col-md-2">
        <div className="form-floating">
          <Field name="noViat" type="text" className="form-control" disabled />
          <label htmlFor="noViat">No. Viatico</label>
        </div>
      </div>
    </div>
  );
};