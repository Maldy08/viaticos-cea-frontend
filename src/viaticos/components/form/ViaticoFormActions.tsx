interface Props {
  isSubmitting: boolean;
  isModificar: boolean;
  onReset?: () => void;
}

/**
 * Botones de acción del formulario
 */
export const ViaticoFormActions = ({ isSubmitting, isModificar, onReset }: Props) => {
  return (
    <div className="container mb-5">
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-outline-primary m-2 guinda"
      >
        {isSubmitting ? 'Procesando...' : isModificar ? 'Modificar' : 'Guardar'}
      </button>
      <button
        disabled={isModificar || isSubmitting}
        className="btn btn-outline-primary guinda"
        type="button"
        onClick={onReset}
      >
        Limpiar
      </button>
    </div>
  );
};