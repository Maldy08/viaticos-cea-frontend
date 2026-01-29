import { Field, ErrorMessage } from 'formik';
import type { Ciudad } from '../../../types/catalogos/ciudad.types';
import type { ID } from '../../../types/common/base.types';

interface Props {
  origenId: ID;
  destinoId: ID;
  ciudades: Ciudad[];
  isLoadingCiudades: boolean;
  isSubmitting: boolean;
  onDestinoChange: (destinoId: number) => void;
}

/**
 * Selector de origen y destino
 */
export const ViaticoFormDestination = ({
  origenId,
  destinoId,
  ciudades,
  isLoadingCiudades,
  isSubmitting,
  onDestinoChange,
}: Props) => {
  return (
    <div className="row gx-4 mt-3">
      <div className="col">
        <div className="form-floating">
          <Field
            title="origenid"
            name="origenid"
            as="select"
            id="origenid"
            disabled={isSubmitting}
            className="form-control text-uppercase"
          >
            <option value="1">Mexicali</option>
            <option value="2">Tijuana</option>
          </Field>
          <label htmlFor="origenid">Ciudad de Origen</label>
        </div>
      </div>

      <div className="col">
        <div className="form-floating">
          <Field
            name="destinoid"
            as="select"
            disabled={isSubmitting}
            className="form-control text-uppercase"
            onChange={(event: any) => {
              const destinoId = Number(event.target.value);
              onDestinoChange(destinoId);
            }}
          >
            <option value="0">Seleccionar...</option>
            {!isLoadingCiudades &&
              ciudades.map(({ idCiudad, ciudad }) =>
                origenId !== idCiudad ? (
                  <option key={idCiudad} value={idCiudad}>
                    {ciudad}
                  </option>
                ) : null
              )}
          </Field>
          <label htmlFor="destinoid">Ciudad de Destino</label>
        </div>
        <ErrorMessage name="destinoid" component="span" className="error" />
      </div>
    </div>
  );
};