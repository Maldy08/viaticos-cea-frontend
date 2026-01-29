import type { ID } from '../../../types/common/base.types';

interface Props {
  empleadoId: ID;
  nombreCompleto: string;
  departamento: string;
  puesto: string;
  viaticosNivel: number;
  onCambiarEmpleado: () => void;
}

/**
 * Header del formulario con información del empleado
 */
export const ViaticoFormHeader = ({
  empleadoId,
  nombreCompleto,
  departamento,
  puesto,
  viaticosNivel,
  onCambiarEmpleado,
}: Props) => {
  return (
    <div className="header bg-light rounded">
      <div className="row">
        <div className="col-md-2">
          <label htmlFor="empleado" className="form-label mb-2">
            EMPLEADO
          </label>
          <span className="form-control">{empleadoId}</span>
        </div>
        <div className="col">
          <span className="d-block nombre-completo">{nombreCompleto}</span>
          <span className="d-block">{departamento}</span>
          <span className="d-block">{puesto}</span>
          {viaticosNivel === 9 && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm guinda mt-2"
              onClick={onCambiarEmpleado}
              title="Buscar Empleados"
            >
              Cambiar de empleado
            </button>
          )}
        </div>
      </div>
    </div>
  );
};