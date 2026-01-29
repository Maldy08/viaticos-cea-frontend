import { Field } from 'formik';
import DatePicker from 'react-datepicker';
import { DateUtils } from '../../../services/domain';

interface Props {
  ejercicio: number;
  fechaSalida: Date;
  fechaRegreso: Date;
  dias: number;
  isSubmitting: boolean;
  onFechaSalidaChange: (date: Date) => void;
  onFechaRegresoChange: (date: Date) => void;
}

/**
 * Selector de fechas de salida, regreso y días
 */
export const ViaticoFormDates = ({
  ejercicio,
  fechaSalida,
  fechaRegreso,
  dias,
  isSubmitting,
  onFechaSalidaChange,
  onFechaRegresoChange,
}: Props) => {
  return (
    <div className="row gx-4 mt-3">
      <div className="col">
        <div className="form-floating">
          <div className="p-0">
            <label htmlFor="fechasal">Fecha de Salida</label>
            <DatePicker
              name="fechasal"
              className="form-control"
              selected={fechaSalida}
              dateFormat="dd/MM/yyyy"
              disabled={isSubmitting}
              maxDate={DateUtils.obtenerFinEjercicio(ejercicio)}
              onChange={onFechaSalidaChange}
            />
          </div>
        </div>
      </div>

      <div className="col">
        <div className="form-floating">
          <div className="p-0">
            <label htmlFor="fechareg">Fecha de Regreso</label>
            <DatePicker
              name="fechareg"
              className="form-control"
              minDate={fechaSalida}
              selected={fechaRegreso}
              disabled={isSubmitting}
              maxDate={DateUtils.obtenerFinEjercicio(ejercicio)}
              dateFormat="dd/MM/yyyy"
              onChange={onFechaRegresoChange}
            />
          </div>
        </div>
      </div>

      <div className="col-md-1">
        <div className="form-floating">
          <Field
            name="dias"
            className="form-control"
            type="number"
            min="1"
            disabled
          />
          <label htmlFor="dias">Dias</label>
        </div>
      </div>
    </div>
  );
};