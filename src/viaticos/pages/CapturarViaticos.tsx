import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import { 
  useCiudadesStore, 
  useEmpleadosStore, 
  useEstadosStore, 
  useLocalData, 
  useOficinasStore, 
  usePaisesStore, 
  usePartidasStore, 
  useUiStore,
  useViaticosStore 
} from "../../hooks";


import type { ViaticoPartida } from "../../types/viaticos/partida.types";
import { ViaticosLayout } from "../layout/ViaticosLayout";

// Importar los nuevos servicios de dominio
import { viaticoCalculator, ubicacionValidator, DateUtils } from '../../services/domain';
import { DESCRIPCION_PARTIDA } from '../../types/viaticos/partida.types';
import type { TipoPartida } from '../../types/viaticos/partida.types';


import "react-datepicker/dist/react-datepicker.css";
import '../styles/CapturarViaticos.css';
import { CalculoViaticoResult, Viatico, ViaticoFormData } from "../../types";

export const CapturarViaticos = () => {
  // Estado local para el cálculo
  const [calculoActual, setCalculoActual] = useState<CalculoViaticoResult | null>(null);

  let isModificarViatico = false;
  
  let { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto, viaticosNivel } = useLocalData();
  const { isLoading, oficinas, startLoadingOficinas } = useOficinasStore();
  const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();
  const { empleado, startLoadingEmpleadoById } = useEmpleadosStore();
  const { startAddNewPartidas, startUpdatePartidas } = usePartidasStore();

  const { isLoading: isLoadingPaises, paises, startLoadingPaises } = usePaisesStore();
  const { isLoading: isLoadingEstados, estados, startLoadingEstados } = useEstadosStore();

  const { openEmpleadosModal, empleadoModalSelected } = useUiStore();
  const empleadoActivoId = empleadoModalSelected || noEmpleado;
  const empleadoHeaderId = empleado?.empleado || empleadoActivoId;
  
  const { startGetConsecutivo, isLoading: isLoadingViatico, startAddNewViatico, viatico, startUpdateViatico } = useViaticosStore();

  useEffect(() => {
    startLoadingOficinas();
    startLoadingCiudades();
    startLoadingPaises();
    startLoadingEstados();
  }, [])

  useEffect(() => {
    startLoadingEmpleadoById(empleadoActivoId);
  }, [empleadoActivoId])

  /**
   * Maneja el cambio de destino y calcula el viático
   */
  const handleChangeDestino = (
    destinoId: number,
    dias: number,
    setFieldValue: any
  ): void => {
    if (destinoId === 0) {
      setCalculoActual(null);
      return;
    }

    // Buscar la ciudad seleccionada
    const ciudad = ciudades.find(c => c.idCiudad === destinoId);
    if (!ciudad) return;

    // Buscar el estado de la ciudad
    const estado = estados.find(e => e.idEstado === ciudad.idEstado);
    if (!estado) return;

    // Buscar el país del estado
    const pais = paises.find(p => p.idPais === estado.idPais);
    if (!pais) return;

    // Validar ubicación usando el servicio
    const validacion = ubicacionValidator.validar(ciudad, estado, pais);

    // Calcular viático usando el servicio
    const resultado = viaticoCalculator.calcular({
      dias,
      nivelEmpleado: empleado.nivel,
      fueraDelEstado: validacion.fueraDelEstado,
      fueraDelPais: validacion.fueraDelPais,
    });

    // Guardar el cálculo actual
    setCalculoActual(resultado);

    console.log('Cálculo de viático:', {
      ciudad: ciudad.ciudad,
      estado: estado.estado,
      pais: pais.pais,
      validacion,
      resultado
    });
  };

  /**
   * Recalcula el viático cuando cambian los días
   */
  const handleChangeDias = (
    dias: number,
    destinoId: number,
    setFieldValue: any
  ): void => {
    if (destinoId === 0 || dias < 1) {
      return;
    }

    // Recalcular con los nuevos días
    handleChangeDestino(destinoId, dias, setFieldValue);
  };

  let initialValues = {} as ViaticoFormData;

  if (Object.keys(viatico).length !== 0) {
    initialValues.idoficina = viatico.oficina;
    initialValues.ejercicio = viatico.ejercicio;
    initialValues.fecha = new Date(viatico.fecha);
    initialValues.estatus = viatico.estatus;
    initialValues.noViat = viatico.noViat;
    initialValues.fechasal = new Date(viatico.fechaSal);
    initialValues.fechareg = new Date(viatico.fechaReg);
    initialValues.dias = viatico.dias;
    initialValues.origenid = empleado.municipio;
    initialValues.destinoid = viatico.destinoId;
    initialValues.motivo = viatico.motivo;
    initialValues.inforact = viatico.inforAct;
    initialValues.lugartrab = viatico.oficina;
    
    isModificarViatico = true;
  } else {
    initialValues.idoficina = empleado.oficina;
    initialValues.ejercicio = +localStorage.getItem('ejercicio')!;
    initialValues.fecha = new Date();
    initialValues.estatus = 0;
    initialValues.noViat = 0;
    initialValues.fechasal = new Date();
    initialValues.fechareg = new Date();
    initialValues.dias = 1;

    switch(empleado.oficina) { 
      case 1:
      case 2:
      case 5:
        initialValues.origenid = 1;
        break;
      case 3:
        initialValues.origenid = 2;
        break;
      default:
    }
    initialValues.destinoid = 0;
    initialValues.motivo = "";
    initialValues.inforact = "";
    initialValues.lugartrab = empleado.lugartrab;
  }

  return (
    <ViaticosLayout>
      <div className="capturar-viaticos">
        <div className="header bg-light rounded">
          <div className="row">
            <div className="col-md-2">
              <label htmlFor="empleado" className="form-label mb-2">EMPLEADO</label>
              <span className="form-control">{empleadoHeaderId}</span>
            </div>
            <div className="col">
              <span className="d-block nombre-completo">{empleado?.nombreCompleto || nombreCompleto}</span>
              <span className="d-block">{empleado?.descripcionDepto || deptoDescripcion}</span>
              <span className="d-block">{empleado?.descripcionPuesto || descripcionPuesto}</span>
              {
                viaticosNivel === 9 ?               
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm guinda mt-2"
                  onClick={openEmpleadosModal}
                  title="Buscar Empleados"
                >
                  Cambiar de empleado
                </button> : <></>
              }
            </div>
          </div>
        </div>

        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={
            Yup.object({
              destinoid: Yup.number()
                .integer()
                .not([0], '* Seleccione una opcion'),
              motivo: Yup.string()
                .max(300, '* Debe de contener 300 caracteres o menos')
                .required('* Este campo es requerido'),
              inforact: Yup.string()
                .max(500, '* Debe de contener 500 caracteres o menos')
                .required('* Este campo es requerido')
            })
          }
          
          onSubmit={async (values, { setSubmitting, setFieldValue, setStatus }) => {
            const consecutivo = await startGetConsecutivo(values.ejercicio, values.idoficina);
            const { noEmpleado: empCrea } = useLocalData();

            // Validar que haya un cálculo
            if (!calculoActual) {
              alert('Por favor seleccione un destino válido');
              setSubmitting(false);
              return;
            }

            const newViatico = {
              oficina: values.idoficina,
              ejercicio: values.ejercicio,
              noViat: consecutivo + 1,
              fecha: new Date(values.fecha),
              noEmp: empleado.empleado,
              origenId: values.origenid, 
              destinoId: values.destinoid,
              motivo: values.motivo.toUpperCase(),
              fechaSal: new Date(values.fechasal),
              fechaReg: new Date(values.fechareg),
              dias: values.dias,
              inforFecha: new Date(values.fechareg),
              inforAct: values.inforact.toUpperCase(),
              lugarTrab: values.idoficina,
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
            } as Viatico;

            const newPartida: ViaticoPartida = {
              partida: calculoActual.partida,
              ejercicio: values.ejercicio,
              importe: calculoActual.importe,
              noviat: consecutivo + 1,
              oficina: values.idoficina
            };

            setSubmitting(true);

            if (isModificarViatico) {
              const updateViatico = {
                oficina: values.idoficina,
                ejercicio: values.ejercicio,
                noViat: values.noViat,
                fecha: new Date(values.fecha),
                origenId: values.origenid,
                destinoId: values.destinoid,
                motivo: values.motivo.toUpperCase(),
                fechaSal: new Date(values.fechasal),
                fechaReg: new Date(values.fechareg),
                dias: values.dias,
                inforFecha: new Date(values.fechareg),
                inforAct: values.inforact.toUpperCase(),
                fechaMod: new Date(values.fecha),
                inforResul: 'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE * VERSION WEB'
              } as Viatico;

              const updatePartida: ViaticoPartida = {
                partida: calculoActual.partida,
                ejercicio: values.ejercicio,
                importe: calculoActual.importe,
                noviat: values.noViat,
                oficina: values.idoficina
              };

              await startUpdateViatico(updateViatico).then(() => {
                startUpdatePartidas(updatePartida);
                alert('Viatico actualizado correctamente!');
                resetForm(setFieldValue, setStatus, setSubmitting);
                setCalculoActual(null);
              }).catch((error) => {
                alert(error);
              }).finally(() => setSubmitting(false));
            } else {
              await startAddNewViatico(newViatico).then(() => {
                startAddNewPartidas(newPartida);
                alert(`Viatico generado con el numero: ${newViatico.noViat}`);
                resetForm(setFieldValue, setStatus, setSubmitting);
                setCalculoActual(null);
              }).catch((error) => {
                alert(error);
              }).finally(() => setSubmitting(false));
            }
          }}
          enableReinitialize={true}
        >
          {
            ({ values, setFieldValue, isSubmitting, status }) => (
              <Form>
                <div className="container">
                  <div className="row gx-4">
                    <div className="col">
                      <div className="form-floating">
                        <Field 
                          name="idoficina" 
                          as="select" 
                          disabled={true}
                          className="form-select text-uppercase"
                        >
                          {
                            !isLoading && oficinas.map(({ idOfi, nombre }) => (
                              <option key={idOfi} value={idOfi}>{nombre}</option>
                            ))
                          }
                        </Field>
                        <label htmlFor="idoficina">Oficina</label>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-floating">
                        <Field disabled name="ejercicio" type="text" className="form-control"/>
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
                            selected={values.fecha}
                            minDate={DateUtils.obtenerInicioEjercicio(values.ejercicio)} 
                            maxDate={DateUtils.obtenerFinEjercicio(values.ejercicio)}
                            onChange={(date: any) => setFieldValue('fecha', date)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-floating">
                        <span className="form-control">{empleadoActivoId}</span>
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

                  <div className="row gx-4 mt-3">
                    <div className="col">
                      <div className="form-floating">
                        <div className="p-0">
                          <label htmlFor="fechasal">Fecha de Salida</label>
                          <DatePicker
                            name="fechasal"
                            className="form-control"
                            selected={values.fechasal}
                            dateFormat="dd/MM/yyyy"
                            disabled={isSubmitting}
                            maxDate={DateUtils.obtenerFinEjercicio(values.ejercicio)}
                            onChange={(date: any) => {
                              setFieldValue('fechasal', date); 
                              setFieldValue('fechareg', date); 
                              const dias = DateUtils.calcularDias(date, date);
                              setFieldValue('dias', dias);
                              handleChangeDias(dias, values.destinoid, setFieldValue);
                            }}
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
                            minDate={values.fechasal}
                            selected={values.fechareg}
                            disabled={isSubmitting}
                            maxDate={DateUtils.obtenerFinEjercicio(values.ejercicio)}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: any) => {
                              setFieldValue('fechareg', date);
                              const dias = DateUtils.calcularDias(values.fechasal, date);
                              setFieldValue('dias', dias);
                              handleChangeDias(dias, values.destinoid, setFieldValue);
                            }}
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
                            setFieldValue('destinoid', destinoId);
                            handleChangeDestino(destinoId, values.dias, setFieldValue);
                          }}
                        >
                          <option value="0">Seleccionar...</option>
                          {
                            !isLoadingCiudades && ciudades.map(({ idCiudad, ciudad }) => (
                              (values.origenid !== idCiudad) &&
                              <option key={idCiudad} value={idCiudad}>{ciudad}</option>
                            ))
                          }
                        </Field>
                        <label htmlFor="destinoid">Ciudad de Destino</label>
                      </div>
                      <ErrorMessage name="destinoid" component="span" className="error"/>
                    </div>
                  </div>

                  <div className="row d-block mt-3">
                    <div className="col"> 
                      <div className="form-floating">
                        <Field
                          className="form-control text-uppercase" 
                          placeholder="Titulo de la Comision" 
                          style={{ fontSize: '14px'}}
                          disabled={isSubmitting}
                          name="motivo"
                          as="textarea"
                        />
                        <label htmlFor="motivo">Titulo de la Comision</label>
                      </div>
                      <ErrorMessage name="motivo" component="span" className="error"/>
                    </div>

                    <div className="col mt-3">
                      <div className="form-floating">
                        <Field 
                          className="form-control text-uppercase" 
                          placeholder="Actividades" 
                          disabled={isSubmitting}
                          name="inforact"
                          as="textarea"
                          style={{ height: '100px', fontSize: '14px'}}
                        />
                        <label htmlFor="inforact">Actividades</label>
                      </div>                       
                    </div>
                    <ErrorMessage name="inforact" component="span" className="error"/>
                  </div>

                  <div className="row gx-4 mt-3">
                    <div className="col">
                      <table className="table table-bordered table-sm">
                        <thead className="text-center">
                          <tr>
                            <th>PARTIDA</th>
                            <th>DESCRIPCION</th>
                            <th>IMPORTE</th>
                            <th>OFI</th>
                            <th>ANO</th>
                            <th>VIAT</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr>
                            <td>{calculoActual?.partida || '-'}</td>
                            <td>{calculoActual?.descripcionPartida || '-'}</td>
                            <td>{calculoActual?.importe.toFixed(2) || '0.00'}</td>
                            <td>{values.idoficina}</td>
                            <td>{values.ejercicio}</td>
                            <td>{values.noViat}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="container mb-5">
                  <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary m-2 guinda">
                    {isSubmitting ? 'Procesando' : isModificarViatico ? 'Modificar' : 'Guardar'}
                  </button>
                  <button disabled={isModificarViatico} className="btn btn-outline-primary guinda" type="reset">
                    Limpiar
                  </button>
                  {status === 'submitted' ? <p>Procesado</p> : <p></p>}
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </ViaticosLayout>
  )
}

// Función auxiliar para resetear el formulario
function resetForm(setFieldValue: any, setStatus: any, setSubmitting: any) {
  setFieldValue('noViat', 0);
  setFieldValue('fecha', new Date());
  setFieldValue('estatus', 0);
  setFieldValue('fechasal', new Date());
  setFieldValue('fechareg', new Date());
  setFieldValue('dias', 1);
  setFieldValue('destinoid', 0);
  setFieldValue('motivo', "");
  setFieldValue('inforact', "");
  setStatus('submitted');
  setSubmitting(false);
}