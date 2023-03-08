import { ErrorMessage, Field, Form } from "formik";
import { useEffect } from "react";
import DatePicker  from "react-datepicker";
import { getDays } from '../../helpers';
import { useCiudadesStore, useEmpleadosStore, useLocalData, useOficinasStore } from "../../hooks";
import { VistaEmpledo } from "../../interfaces/interfaces";



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

  interface FormProps {
    values:Props,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    isSubmitting:boolean,
    status:any,
    empleado:VistaEmpledo


  }


export const CapturarViaticosForm = ( { values, setFieldValue, isSubmitting, status, empleado }: FormProps ) => {

    const { isLoading ,oficinas, startLoadingOficinas } = useOficinasStore();
    const { isLoading: isLoadingCiudades, startLoadingCiudades, ciudades } = useCiudadesStore();

    let fueraDelEstado: boolean;
    let isModificarViatico = false;
    
    const importeViaticoDentroEstadoNivel1 = 230;
    const importeViaticoFueraEstadoNivel1 = 430;
    const importeViaticoDentroEstadoNivel2 = 260;
    const importeViaticoFueraEstadoNivel2 = 450;

    useEffect(() => {
        startLoadingOficinas();
     }, [])
    
     useEffect(() => {
       startLoadingCiudades();
    }, [])


    
  const importePorDias = ( dias:number ): number => {

    let importeViatico: number;
    if( fueraDelEstado ) {
       importeViatico = empleado.nivel < 17 ? importeViaticoFueraEstadoNivel1 * dias : importeViaticoFueraEstadoNivel2 * dias;
    } else {
       importeViatico = empleado.nivel < 17 ? importeViaticoDentroEstadoNivel1 * dias : importeViaticoDentroEstadoNivel2 * dias;
    }

    return importeViatico;
  }

  const handleChangeDestino = ( event: React.ChangeEvent<HTMLSelectElement> ): void => {

    const value = Number( event.target.value );
    value > 6 ? fueraDelEstado = true : fueraDelEstado = false;
  
  }


  return (

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
                    disabled={isSubmitting}
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
                <span className="form-control">{ empleado.empleado }</span>
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                    className="btn btn-outline-primary btn-sm guinda"
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
        <div className="container mb-5">
            <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary m-2 guinda">
            { isSubmitting? 'Procesando' : isModificarViatico? 'Modificar' : 'Guardar'}
            </button>
            <button disabled={isModificarViatico} className="btn btn-outline-primary guinda" type="reset">Limpiar</button>
            {
            status === 'submitted' ? <p>Procesado</p>: <p></p>
            }
        </div>
        
    </Form>
  )
}
