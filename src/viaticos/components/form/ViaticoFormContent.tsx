import { Field, ErrorMessage } from 'formik';

interface Props {
  isSubmitting: boolean;
}

/**
 * Campos de motivo y actividades
 */
export const ViaticoFormContent = ({ isSubmitting }: Props) => {
  return (
    <div className="row d-block mt-3">
      <div className="col">
        <div className="form-floating">
          <Field
            className="form-control text-uppercase"
            placeholder="Titulo de la Comision"
            style={{ fontSize: '14px' }}
            disabled={isSubmitting}
            name="motivo"
            as="textarea"
          />
          <label htmlFor="motivo">Titulo de la Comision</label>
        </div>
        <ErrorMessage name="motivo" component="span" className="error" />
      </div>

      <div className="col mt-3">
        <div className="form-floating">
          <Field
            className="form-control text-uppercase"
            placeholder="Actividades"
            disabled={isSubmitting}
            name="inforact"
            as="textarea"
            style={{ height: '100px', fontSize: '14px' }}
          />
          <label htmlFor="inforact">Actividades</label>
        </div>
      </div>
      <ErrorMessage name="inforact" component="span" className="error" />
    </div>
  );
};