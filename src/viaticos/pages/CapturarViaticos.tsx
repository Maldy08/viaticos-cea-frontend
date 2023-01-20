import DatePicker  from "react-datepicker";
import { ViaticosLayout } from "../layout/ViaticosLayout"
import '../styles/CapturarViaticos.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useCiudadesStore, useLocalData, useOficinasStore, useUiStore } from "../../hooks";



export const CapturarViaticos = () => {

  const { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto } = useLocalData();
  const { isLoading ,oficinas, startLoadingOficinas } = useOficinasStore();
  const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();
  const { openEmpleadosModal } = useUiStore();

  const getDays = ( fecha1: Date, fecha2:Date ) =>{
    const days = fecha2.getTime() - fecha1.getTime()
    const difference = Math.round(days / (1000 * 3600 * 24));
    return difference + 1;
  }

  useEffect(() => {
     startLoadingOficinas();
  }, [])

  useEffect(() => {
    startLoadingCiudades();
 }, [])

 const onClickCatalogoEmpleados = () => {

    //alert(depto)
    openEmpleadosModal();
 }


  return (
    <ViaticosLayout>
        <div className="capturar-viaticos">
            <div className="header">
                <div className="row">
                    <div className="col-md-2">
                      <label htmlFor="empleado" className="form-label mb-2">EMPLEADO</label>
                      <input readOnly className="form-control form-control-sm" value={ noEmpleado } type="text" name="empleado" title="empleado" />
                    </div>
                    <div className="col-md-8">
                       <span className=" d-block text-decoration-underline">{ nombreCompleto }</span>
                       <span className="d-block">{ deptoDescripcion }</span>
                       <span className="d-block">{ descripcionPuesto }</span>
                    </div>
                </div>
                <div className="row mt-2">
                   <div className="col-md-4">
                    <button
                       type="button"
                       className="btn btn-outline-primary btn-sm"
                       onClick={ onClickCatalogoEmpleados }
                       title="Buscar Empleados">
                          Buscar en Catalogo
                      </button>
                   </div>
                </div>
            </div>
            
            <hr />

            {/* //TODO: Envolver en un Form */}

                  <Formik
                        initialValues={{
                          idoficina:1,
                          ejercicio:2023,
                          fecha: new Date(),
                          empleado:noEmpleado,
                          estatus:0,
                          noviat:0,
                          fechasal: new Date(),
                          fechareg: new Date(),
                          dias:1,
                          origenid:0,
                          destinoid:0,
                          motivo:"",
                          inforact:""
                        }}
                        onSubmit={ (values) => {
                          console.log( values );
                        }}

>
                      {
                        ({ values, setFieldValue }) => (

                          
                          <Form>
                              <div className="container px-4">
                                  <div className="row gx-4">
                                    <div className="col">
                                      <div className="form-floating">
                                        <Field name="idoficina" as="select" className="form-select text-uppercase">
                                          {
                                            !isLoading && oficinas.map( oficina => (
                                              <option key={ oficina.idOfi } value={ oficina.idOfi }>{ oficina.nombre }</option>
                                            ))
                                          }
                                        </Field>
                                        <label htmlFor="idoficina">Oficina</label>
                                      </div>
                                  </div>

                                    <div className="col">
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
                                            selected={ values.fecha } 
                                            onChange={( date:any ) => setFieldValue('fecha', date)}
                                         />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="col">
                                      <div className="form-floating">
                                        <Field disabled name="empleado" className="form-control" type="text"/>
                                        <label htmlFor="empleado2">Empleado</label>
                                      </div>
                                    </div>

                                    <div className="col-md-1">
                                      <div className="form-floating">
                                        <Field name="noviat" type="text" className="form-control" disabled />
                                        <label htmlFor="noviat">No. Viatico</label>
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
                                              selected={ values.fechasal }
                                              dateFormat="dd/MM/yyyy"
                                              onChange={( date:any ) => { setFieldValue('fechasal', date ); setFieldValue('fechareg',date ); setFieldValue('dias', getDays( date, date )) }}
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
                                              minDate={ values.fechasal }
                                              selected={ values.fechareg }
                                              dateFormat="dd/MM/yyyy"
                                              onChange={( date:any ) => { setFieldValue('fechareg', date ); setFieldValue('dias', getDays( values.fechasal, date ) )}}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col">
                                      <div className="form-floating">
                                        <Field name="dias" className="form-control" type="number" min="1" disabled/>
                                        <label htmlFor="dias">Dias</label>
                                      </div>
                                    </div>

                                    <div className="col">
                                      <div className="form-floating">
                                        <Field name="origenid" as="select" className="form-control text-uppercase">
                                          <option value="1">Mexicali</option>
                                          <option value="2">Tijuana</option>
                                        </Field>
                                        <label htmlFor="origenid">Ciudad de Origen</label>
                                      </div>
                                    </div>

                                    
                                    <div className="col">
                                      <div className="form-floating">
                                        <Field name="destinoid" as="select" className="form-control text-uppercase">
                                        {
                                            !isLoadingCiudades && ciudades.map( ciudades => (
                                              <option key={ ciudades.idCiudad } value={ ciudades.idCiudad }>{ ciudades.ciudad }</option>
                                            ))
                                          }
                                        </Field>
                                        <label htmlFor="destinoid">Ciudad de Destino</label>
                                      </div>
                                    </div>

                                    <div className="col">
                                      <div className="p-3">
                                          <button
                                            type="button"
                                            title="Ver Catalogo de Ciudades"
                                            className="btn btn-outline-primary btn-sm"
                                           >
                                              Ver Catalogo
                                          </button> 
                                      </div>
                                    </div>

                                  </div>
                              </div>

                          </Form>
                        )
                      }

                 </Formik>

      </div>
    </ViaticosLayout>
  )
}
