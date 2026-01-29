import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from 'yup';

import { ViaticosLayout } from "../layout/ViaticosLayout";
import {
  ViaticoFormHeader,
  ViaticoFormBasicInfo,
  ViaticoFormDates,
  ViaticoFormDestination,
  ViaticoFormContent,
  ViaticoFormPartidas,
  ViaticoFormActions,
} from "../components/form";

import {
  useCiudadesStore,
  useEmpleadosStore,
  useEstadosStore,
  useLocalData,
  useOficinasStore,
  usePaisesStore,
  useUiStore,
  useViaticosStore,
} from "../../hooks";

import {
  useViaticoForm,
  useViaticoCalculation,
  useViaticoSubmit,
} from "../../hooks/viaticos";

import { DateUtils } from '../../services/domain';
import type { ViaticoFormData } from "../../types/viaticos/viatico.types";

import "react-datepicker/dist/react-datepicker.css";
import '../styles/CapturarViaticos.css';

/**
 * Esquema de validación del formulario
 */
const validationSchema = Yup.object({
  destinoid: Yup.number()
    .integer()
    .not([0], '* Seleccione una opcion'),
  motivo: Yup.string()
    .max(300, '* Debe de contener 300 caracteres o menos')
    .required('* Este campo es requerido'),
  inforact: Yup.string()
    .max(500, '* Debe de contener 500 caracteres o menos')
    .required('* Este campo es requerido')
});

/**
 * Función auxiliar para resetear el formulario a valores iniciales
 */
const resetFormToInitialValues = (
  formikHelpers: FormikHelpers<ViaticoFormData>,
  empleadoOficina: number,
  empleadoMunicipio: number,
  empleadoLugarTrab: number
): void => {
  const ejercicio = +localStorage.getItem('ejercicio')!;
  
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

  // Resetear todos los valores
  formikHelpers.setFieldValue('noViat', 0);
  formikHelpers.setFieldValue('fecha', new Date());
  formikHelpers.setFieldValue('estatus', 0);
  formikHelpers.setFieldValue('fechasal', new Date());
  formikHelpers.setFieldValue('fechareg', new Date());
  formikHelpers.setFieldValue('dias', 1);
  formikHelpers.setFieldValue('origenid', origenid);
  formikHelpers.setFieldValue('destinoid', 0);
  formikHelpers.setFieldValue('motivo', '');
  formikHelpers.setFieldValue('inforact', '');
  formikHelpers.setFieldValue('lugartrab', empleadoLugarTrab);
};

/**
 * Página principal para capturar/editar viáticos
 * Refactorizado aplicando principios SOLID
 */
export const CapturarViaticos = () => {
  const { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto, viaticosNivel } = useLocalData();

  const { isLoading: isLoadingOficinas, oficinas, startLoadingOficinas } = useOficinasStore();
  const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();
  const { isLoading: isLoadingPaises, paises, startLoadingPaises } = usePaisesStore();
  const { isLoading: isLoadingEstados, estados, startLoadingEstados } = useEstadosStore();
  const { empleado, startLoadingEmpleadoById } = useEmpleadosStore();
  const { openEmpleadosModal, empleadoModalSelected } = useUiStore();
  const { viatico } = useViaticosStore();

  const empleadoActivoId = empleadoModalSelected || noEmpleado;
  const empleadoHeaderId = empleado?.empleado || empleadoActivoId;

  const { initialValues, isModificarViatico } = useViaticoForm(
    viatico,
    empleado?.oficina || 1,
    empleado?.municipio || 1,
    empleado?.lugartrab || 1
  );

  const { calculoActual, calcularViatico, resetCalculo } = useViaticoCalculation(
    ciudades,
    estados,
    paises,
    empleado?.nivel || 1
  );

  const { submitViatico } = useViaticoSubmit(
    empleado?.empleado || empleadoActivoId,
    calculoActual,
    isModificarViatico,
    {
      onSuccess: (noViat) => {
        const mensaje = isModificarViatico
          ? 'Viatico actualizado correctamente!'
          : `Viatico generado con el numero: ${noViat}`;
        alert(mensaje);
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  useEffect(() => {
    startLoadingOficinas();
    startLoadingCiudades();
    startLoadingPaises();
    startLoadingEstados();
  }, []);

  useEffect(() => {
    startLoadingEmpleadoById(empleadoActivoId);
  }, [empleadoActivoId]);

  return (
    <ViaticosLayout>
      <div className="capturar-viaticos">
        <ViaticoFormHeader
          empleadoId={empleadoHeaderId}
          nombreCompleto={empleado?.nombreCompleto || nombreCompleto}
          departamento={empleado?.descripcionDepto || deptoDescripcion}
          puesto={empleado?.descripcionPuesto || descripcionPuesto}
          viaticosNivel={viaticosNivel}
          onCambiarEmpleado={openEmpleadosModal}
        />

        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, formikHelpers) => {
            const { setSubmitting } = formikHelpers;
            setSubmitting(true);
            
            try {
              await submitViatico(values);
              
              // Resetear formulario después del éxito (solo en modo creación)
              if (!isModificarViatico) {
                resetFormToInitialValues(
                  formikHelpers,
                  empleado?.oficina || 1,
                  empleado?.municipio || 1,
                  empleado?.lugartrab || 1
                );
                resetCalculo();
              }
            } catch (error: any) {
              alert(error.message || 'Error al procesar el viático');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formikProps) => {
            const { values, setFieldValue, isSubmitting } = formikProps;

            const handleReset = () => {
              resetFormToInitialValues(
                formikProps,
                empleado?.oficina || 1,
                empleado?.municipio || 1,
                empleado?.lugartrab || 1
              );
              resetCalculo();
            };

            return (
              <Form>
                <div className="container">
                  <ViaticoFormBasicInfo
                    oficinas={oficinas}
                    isLoadingOficinas={isLoadingOficinas}
                    ejercicio={values.ejercicio}
                    fecha={values.fecha}
                    empleadoId={empleadoActivoId}
                    noViat={values.noViat}
                    isSubmitting={isSubmitting}
                    onFechaChange={(date: Date) => setFieldValue('fecha', date)}
                  />

                  <ViaticoFormDates
                    ejercicio={values.ejercicio}
                    fechaSalida={values.fechasal}
                    fechaRegreso={values.fechareg}
                    dias={values.dias}
                    isSubmitting={isSubmitting}
                    onFechaSalidaChange={(date: Date) => {
                      setFieldValue('fechasal', date);
                      setFieldValue('fechareg', date);
                      const dias = DateUtils.calcularDias(date, date);
                      setFieldValue('dias', dias);
                      calcularViatico(values.destinoid, dias);
                    }}
                    onFechaRegresoChange={(date: Date) => {
                      setFieldValue('fechareg', date);
                      const dias = DateUtils.calcularDias(values.fechasal, date);
                      setFieldValue('dias', dias);
                      calcularViatico(values.destinoid, dias);
                    }}
                  />

                  <ViaticoFormDestination
                    origenId={values.origenid}
                    destinoId={values.destinoid}
                    ciudades={ciudades}
                    isLoadingCiudades={isLoadingCiudades}
                    isSubmitting={isSubmitting}
                    onDestinoChange={(destinoId: number) => {
                      setFieldValue('destinoid', destinoId);
                      calcularViatico(destinoId, values.dias);
                    }}
                  />

                  <ViaticoFormContent isSubmitting={isSubmitting} />

                  <ViaticoFormPartidas
                    calculo={calculoActual}
                    oficina={values.idoficina}
                    ejercicio={values.ejercicio}
                    noViat={values.noViat}
                  />
                </div>

                <ViaticoFormActions
                  isSubmitting={isSubmitting}
                  isModificar={isModificarViatico}
                  onReset={handleReset}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </ViaticosLayout>
  );
};