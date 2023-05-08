import { useEffect } from "react";
import DatePicker  from "react-datepicker";

import {  ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useCiudadesStore, 
         useEmpleadosStore, 
         useEstadosStore, 
         useLocalData, 
         useOficinasStore, 
         usePaisesStore, 
         usePartidasStore, 
         useViaticosStore } from "../../hooks";

import { Viaticos, ViaticosPart } from "../../interfaces/interfaces";
import { ViaticosLayout } from "../layout/ViaticosLayout"
import { getDays, importePorDias } from '../../helpers';

import "react-datepicker/dist/react-datepicker.css";
import '../styles/CapturarViaticos.css';

interface Props {
  empleado:number;
  idoficina:number
  ejercicio:number;
  fecha: Date;
  estatus:number;
  noViat:number;
  fechasal: Date;
  fechareg: Date;
  dias:number;
  origenid:number;
  destinoid:number;
  motivo:string;
  inforact:string;
}

export const CapturarViaticos = () => {
//idoficina,ejercicio,fecha,estatus,noViat,fechasal,fechareg,dias,origenid,destinoid,motivo,inforact
  let fueraDelEstado: boolean;
  let fueraDelPais: boolean;
  let partida =  37501;
  let descripcionPartida = "VIATICOS EN EL PAIS";

  let isModificarViatico = false;
  
  let { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto, oficina } = useLocalData();
  const { isLoading ,oficinas, startLoadingOficinas } = useOficinasStore();
  const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();
  const { empleado, startLoadingEmpleadoById } = useEmpleadosStore();
  const { startAddNewPartidas } = usePartidasStore();

  const {isLoading: isLoadingPaises,paises, startLoadingPaises } = usePaisesStore();
  const { isLoading:isLoadingEstados, estados, startLoadingEstados } = useEstadosStore();

  
  const { startGetConsecutivo, isLoading: isLoadingViatico, startAddNewViatico, viatico, startUpdateViatico } = useViaticosStore();
    
  useEffect(() => {
     startLoadingOficinas();
  }, [])
 
  useEffect(() => {
    startLoadingCiudades();
 }, [])

  useEffect(() => {
    startLoadingPaises();
  }, [])

  useEffect(() => {
    startLoadingEstados();
  }, [])

  useEffect(() => {
    startLoadingEmpleadoById( noEmpleado );
  }, [])

let initialValues = {} as Props;

  if(Object.keys(viatico).length !== 0) {
    
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
      initialValues.inforact =viatico.inforAct;
      isModificarViatico = true;
  }
  else{
      initialValues.idoficina = empleado.oficina;
      initialValues.ejercicio = 2023;
      initialValues.fecha = new Date();
      initialValues.estatus = 0;
      initialValues.noViat = 0;
      initialValues.fechasal = new Date();
      initialValues.fechareg = new Date();
      initialValues.dias = 1;
      initialValues.origenid = empleado.municipio;
      initialValues.destinoid = 0;
      initialValues.motivo = "";
      initialValues.inforact = "";
  }



  const handleChangeDestino = ( event: React.ChangeEvent<HTMLSelectElement> ): void => {

    const value = Number( event.target.value );
    value > 6 ? fueraDelEstado = true : fueraDelEstado = false;
    const ciudad = ciudades.filter((ciudad) => ciudad.idCiudad == value ); 
    const estado = estados.filter((estado) => estado.idEstado == ciudad[0].idEstado);
    const idpais = paises.filter((pais) =>  pais.idPais == estado[0].idPais);
    idpais[0].idPais > 1 ? fueraDelPais = true : fueraDelPais = false;
    fueraDelPais ? partida = 37502 : partida = 37501;
    partida == 37502 ? descripcionPartida = "VIATICOS FUERA DEL PAIS" : descripcionPartida = "VIATICOS EN EL PAIS";


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
          {/* <div className="row mt-2">
            <div className="col-md-4">
              <button
              type="button"
              className="btn btn-outline-primary btn-sm guinda"
              onClick={ onClickCatalogoEmpleados }
              disabled = {isModificarViatico}
              title="Buscar Empleados">
                Buscar en Catalogo
              </button>
            </div>
          </div> */}
        </div>
        {/* <select name="" id="" onChange={}></select> */}
        <hr />
        {/* //TODO: Envolver en un Form */}
        <Formik

             initialValues={initialValues}
            
              
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
              
              
              onSubmit={ async ( values, { setSubmitting,setFieldValue, setStatus, resetForm } ) => {
                 
                 // await new Promise( resolve => setTimeout(resolve, 3000));
            

                  const consecutivo = await startGetConsecutivo( values.ejercicio, values.idoficina );
                  const { noEmpleado:empCrea } = useLocalData()

                  const newViatico = {
                      oficina:values.idoficina,
                      ejercicio: values.ejercicio,
                      noViat:consecutivo + 1,
                      fecha: new Date(values.fecha),
                      noEmp: empleado.empleado,
                      origenId: values.origenid,
                      destinoId: values.destinoid,
                      motivo: values.motivo,
                      fechaSal: new Date(values.fechasal),
                      fechaReg: new Date(values.fechareg),
                      dias: values.dias,
                      inforFecha: new Date(values.fechareg),
                      inforAct: values.inforact,
                      nota:'nada',
                      estatus:1,
                      pol:0,
                      polMes:0,
                      caja:0,
                      fechaMod: new Date(values.fecha),
                      cajaVale:0,
                      cajaRepo:0,
                      noEmpCrea:empCrea,
                      inforResul:'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE'
                  } as Viaticos;

                  const newPartida = {
                    partida:partida,
                    ejercicio: 2023,
                    importe: importePorDias( values.dias,empleado.nivel,fueraDelEstado ),
                    noviat: consecutivo + 1,
                    oficina: values.idoficina

                  } as ViaticosPart;
                    
                  //console.log( newViatico );
                  //console.log( newPartida );
                  setSubmitting(true);

                  if(isModificarViatico) {

                    const updateViatico = {
                      oficina:values.idoficina,
                      ejercicio: values.ejercicio,
                      noViat:values.noViat,
                      fecha: new Date(values.fecha),
                      origenId: values.origenid,
                      destinoId: values.destinoid,
                      motivo: values.motivo,
                      fechaSal: new Date(values.fechasal),
                      fechaReg: new Date(values.fechareg),
                      dias: values.dias,
                      inforFecha: new Date(values.fechareg),
                      inforAct: values.inforact,
                      fechaMod: new Date(values.fecha),
                      inforResul:'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE'
                  } as Viaticos;


                    await startUpdateViatico( updateViatico ).then( () => {
                    
                      alert('Viatico actualizado correctamente!');
                      setFieldValue('noViat', 0);
                      setFieldValue('fecha',new Date());
                      setFieldValue('estatus',0);
                      setFieldValue('fechasal', new Date());
                      setFieldValue('fechareg', new Date());
                      setFieldValue('dias', 1);
                      setFieldValue('origenid',empleado.municipio);
                      setFieldValue('destinoid',0);
                      setFieldValue('motivo',"");
                      setFieldValue('inforact', "");
                      setStatus('submitted');
                      setSubmitting(false);
                      return ;

                    }).catch( (error) => {
                      alert( error );
                    }).finally( () => setSubmitting( false ));

                    
                  }
                 
                  else {

                    await startAddNewViatico( newViatico ).then( () => {
                        
                      startAddNewPartidas( newPartida );
                          alert(`Viatico generado con el numero: ${newViatico.noViat}`);
                          setFieldValue('noViat', 0);
                          setFieldValue('fecha',new Date());
                          setFieldValue('estatus',0);
                          setFieldValue('fechasal', new Date());
                          setFieldValue('fechareg', new Date());
                          setFieldValue('dias', 1);
                          setFieldValue('origenid',empleado.municipio);
                          setFieldValue('destinoid',0);
                          setFieldValue('motivo',"");
                          setFieldValue('inforact', "");
                          setStatus('submitted');
                          setSubmitting(false);
                          
                          window.open( "formato-comision/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          window.open( "recibo-viatico/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          window.open( "informe-actividades/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          //resetForm();
                          
                          return;

                    }).catch((error) => {
                      alert(error);
                    }).finally(() => setSubmitting(false));
               
                  }
                  //console.log({viaticoProcesado});
                  //console.log({partidaProcesada});
              }}
              
              enableReinitialize={ true }
              
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
                              dateFormat="dd/MM/yyyy"
                              disabled={ isSubmitting }
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
                                disabled={ isSubmitting }
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
                                disabled={ isSubmitting }
                                dateFormat="dd/MM/yyyy"
                                onChange={
                                  ( date:any ) =>
                                    { 
                                    setFieldValue('fechareg', date );
                                    setFieldValue('dias', getDays( values.fechasal, date ) );
                                    importePorDias( (getDays( values.fechasal, date )),empleado.nivel,fueraDelEstado );
                                    
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
                              disabled={ isSubmitting }
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
                            disabled={ isSubmitting }
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

                      {/* <div className="col">
                        <div className="p-3">
                            <button
                              type="button"
                              title="Ver Catalogo de Ciudades"
                              className="btn btn-outline-primary btn-sm guinda"
                              >
                                Ver Catalogo
                            </button> 
                        </div>
                      </div> */}

                    </div>

                    <div className="row d-block mt-3">
                      <div className="col"> 
                        <div className="form-floating">
                        
                            <Field
                              className="form-control text-uppercase" 
                              placeholder="Titulo de la Comision" 
                              style={{ fontSize: '14px'}}
                              disabled={ isSubmitting }
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
                                disabled={ isSubmitting }
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
                              <td>{ partida }</td>
                              <td>{ descripcionPartida }</td>
                              <td>{ importePorDias( values.dias, empleado.nivel, fueraDelEstado ) }</td>
                              <td>{ values.idoficina }</td>
                              <td>{ values.ejercicio }</td>
                              <td>{ values.noViat }</td>
                              
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                          
                </div> {/* */}
                <div className="container mb-5">
                    <button type="submit" disabled={ isSubmitting } className="btn btn-outline-primary m-2 guinda">
                      { isSubmitting? 'Procesando' : isModificarViatico? 'Modificar' : 'Guardar'}
                    </button>
                    <button disabled={ isModificarViatico } className="btn btn-outline-primary guinda" type="reset">Limpiar</button>
                    {
                      status === 'submitted' ? <p>Procesado</p>: <p></p>
                    }
                </div>
                {/* <Link to={`/formato-comision/${1}/${2022}/${2}` } target="_blank">asfjifj</Link> */}
            </Form>
                
              )
            }
        </Formik>
      </div>
    </ViaticosLayout>
  )
}
