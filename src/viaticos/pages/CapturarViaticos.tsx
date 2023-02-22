import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker  from "react-datepicker";
import { Link } from "react-router-dom";
import {  ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useCiudadesStore, useEmpleadosStore, useLocalData, useOficinasStore, usePartidasStore, useUiStore, useViaticosStore } from "../../hooks";
import { Viaticos, ViaticosPart } from "../../interfaces/interfaces";
import { ViaticosLayout } from "../layout/ViaticosLayout"

import { getDays } from '../../helpers';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/CapturarViaticos.css';


export const CapturarViaticos = () => {

  let fueraDelEstado: boolean;
  let { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto } = useLocalData();
  const { isLoading ,oficinas, startLoadingOficinas } = useOficinasStore();
  const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();
  const { empleado, startLoadingEmpleadoById } = useEmpleadosStore();
  const { openEmpleadosModal, empleadoModalSelected } = useUiStore();
  const { startGetConsecutivo, isLoading: isLoadingViatico, startAddNewViatico } = useViaticosStore();
  const { startAddNewPartidas } = usePartidasStore();

  const importeViaticoDentroEstadoNivel1 = 230;
  const importeViaticoFueraEstadoNivel1 = 430;
  const importeViaticoDentroEstadoNivel2 = 260;
  const importeViaticoFueraEstadoNivel2 = 450;

  const {formatoComision, startGetFormatoComision} = useViaticosStore();
  const { oficina, ejercicio, noviat } = useParams();
  console.log('Oficina:' + oficina);
  console.log('Ejercicio:' + ejercicio);
  console.log('Noviat:' + noviat);

    useEffect(() => {
        startGetFormatoComision(  parseInt(oficina!) , parseInt(ejercicio!), parseInt(noviat!) );
      }, [])
  
      console.log('Nombre:' + formatoComision.nombre);

  useEffect(() => {
     startLoadingOficinas();
  }, [])
 
  useEffect(() => {
    startLoadingCiudades();
 }, [])

 useEffect(() => {
  startLoadingEmpleadoById( noEmpleado );
}, [])


 const onClickCatalogoEmpleados = () => {
    openEmpleadosModal();
 }

 if( empleadoModalSelected !== 0 ) {
    noEmpleado = empleado.empleado;
    nombreCompleto = empleado.nombreCompleto;
    deptoDescripcion = empleado.descripcionDepto;
    descripcionPuesto = empleado.descripcionPuesto;
 }

  const handleChangeDestino = ( event: React.ChangeEvent<HTMLSelectElement> ): void => {

    const value = Number( event.target.value );
    value > 6 ? fueraDelEstado = true : fueraDelEstado = false;
  
  }

  const importePorDias = ( dias:number ): number => {

    let importeViatico: number;
    if( fueraDelEstado ) {
       importeViatico = empleado.nivel < 17 ? importeViaticoFueraEstadoNivel1 * dias : importeViaticoFueraEstadoNivel2 * dias;
    } else {
       importeViatico = empleado.nivel < 17 ? importeViaticoDentroEstadoNivel1 * dias : importeViaticoDentroEstadoNivel2 * dias;
    }

    return importeViatico;
  }

  return (
    <ViaticosLayout>
        <div className="capturar-viaticos">
            <div className="header">
                <div className="row">
                    <div className="col-md-2">
                      <label htmlFor="empleado" className="form-label mb-2">EMPLEADO</label>
                      <span className="form-control">{ noEmpleado }</span>
                    </div>
                    <div className="col">
                       <span className="d-block nombre-completo">{ nombreCompleto }</span>
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
           {/* <select name="" id="" onChange={}></select> */}
            
            <hr />

            {/* //TODO: Envolver en un Form */}

                  <Formik
                        initialValues={{
                            idoficina:empleado.oficina,
                            ejercicio:2023,
                            fecha: new Date(),
                            estatus:1,
                            noViat:0,
                            fechasal: new Date(),
                            fechareg: new Date(),
                            dias:1,
                            origenid:empleado.municipio,
                            destinoid:0,
                            motivo:"",
                            inforact:"",
                        }}
                        
                        validationSchema={
                            Yup.object({
                              destinoid: Yup.number()
                                           .integer()
                                           .not([0],'* Seleccione una opcion'),
                              motivo: Yup.string()
                                          .max(300,'* Debe de contener 300 caracteres o menos')
                                          .required('* Este campo es requerido'),
                              inforact: Yup.string()
                                          .max(500,'* Debe de contener 500 caracteres o menos')
                                          .required('* Este campo es requerido')
                              
                            })
                        }
                        
                        
                        onSubmit={ async ( values, { setSubmitting } ) => {

                            const consecutivo = await startGetConsecutivo( values.ejercicio, values.idoficina );
                            const { noEmpleado:empCrea } = useLocalData()
                            setSubmitting(false);
                           
                            const newViatico = {

                                oficina:values.idoficina,
                                ejercicio: values.ejercicio,
                                noViat:consecutivo + 1,
                                fecha: values.fecha,
                                noEmp: empleado.empleado,
                                origenId: values.origenid,
                                destinoId: values.destinoid,
                                motivo: values.motivo,
                                fechaSal: values.fechasal,
                                fechaReg: values.fechareg,
                                dias: values.dias,
                                inforFecha: values.fechareg,
                                inforAct: values.inforact,
                                nota:'',
                                estatus:1,
                                pol:0,
                                polMes:0,
                                caja:0,
                                cajaVale:0,
                                cajaRepo:0,
                                noEmpCrea:empCrea,
                                inforResult:'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE'

                            } as Viaticos;

                            const newPartida = {

                              partida:37501,
                              ejercicio: 2023,
                              importe: importePorDias( values.dias ),
                              noviat: consecutivo + 1,
                              oficina: values.idoficina

                            } as ViaticosPart;
                             
                            console.log( newViatico );
                            console.log( newPartida );
                            setSubmitting(true);
                            //resetForm()
                            //setFieldValue('noViat', newViatico.noViat);
                            //)
                            
                            //values.noviat = newViatico.noViat;
                            //alert('Viatico creado exitosamente!!');
                            //await startAddNewViatico( newViatico );
                            // await startAddNewPartidas( newPartida );

                        }}
                        
                        enableReinitialize={ true }
                        
                    >
                      {
                        ({ values, setFieldValue, isSubmitting }) => (
                          
                          <Form>
                              <div className="d-flex">
                                 <button type="submit" className="btn btn-outline-primary">Guardar</button>
                              </div>
                              <div className="container px-4">
                                  <div className="row gx-4">
                                    <div className="col">
                                      <div className="form-floating">
                                        <Field 
                                            name="idoficina" 
                                            as="select" 
                                            className="form-select text-uppercase"
                                        >
                                          {
                                            !isLoading && oficinas.map( ({ idOfi, nombre }) => (
                                              <option key={ idOfi } value={ idOfi }>{ nombre }</option>
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
                                            selected={ values.fecha } 
                                            onChange={
                                              ( date:any ) => setFieldValue('fecha', date)
                                            }
                                         />

                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-2">
                                      <div className="form-floating">
                                        <span className="form-control">{ noEmpleado }</span>
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
                                              selected={ values.fechasal }
                                              dateFormat="dd/MM/yyyy"
                                              onChange={
                                                ( date:any ) => 
                                                  { 
                                                    setFieldValue('fechasal', date ); 
                                                    setFieldValue('fechareg',date ); 
                                                    setFieldValue('dias', getDays( date, date ))
                                                  }
                                                }
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
                                              onChange={
                                                ( date:any ) =>
                                                 { 
                                                  setFieldValue('fechareg', date );
                                                  setFieldValue('dias', getDays( values.fechasal, date ) );
                                                  importePorDias( getDays( values.fechasal, date ) );
                                                  
                                                }
                                              }
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
                                          className="form-control text-uppercase"
                                          onChange={ ( event:any ) => {
                                              setFieldValue('destinoid', event.target.value );
                                              handleChangeDestino( event )
                                          } }
                                        >
                                          <option value="0">Seleccionar...</option>
                                        {
                                            !isLoadingCiudades && ciudades.map(({ idCiudad, ciudad }) => (
                                              <option key={ idCiudad } value={ idCiudad }>{ ciudad }</option>
                                            ))
                                        }
                                        </Field>
                                        <label htmlFor="destinoid">Ciudad de Destino</label>
                                        
                                      </div>
                                      <ErrorMessage name="destinoid" component="span" className="error"/>
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

                                  <div className="row d-block mt-3">
                                    <div className="col"> 
                                      <div className="form-floating">
                                     
                                          <Field
                                            className="form-control" 
                                            placeholder="Titulo de la Comision" 
                                            style={{ fontSize: '14px'}}
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
                                              className="form-control" 
                                              placeholder="Actividades" 
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
                                            <td>37501</td>
                                            <td>VIATICOS EN EL PAIS</td>
                                            <td>{ importePorDias( values.dias ) }</td>
                                            <td>{ values.idoficina }</td>
                                            <td>{ values.ejercicio }</td>
                                            <td>{ values.noViat }</td>
                                            
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                        
                              </div> {/* */}
                             
                              {/* <Link to={`/formato-comision/${1}/${2022}/${2}` } target="_blank">asfjifj</Link> */}
                          </Form>
                          
                        )
                      }

                 </Formik>


      </div>
    </ViaticosLayout>
  )
}
