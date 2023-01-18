import DatePicker  from "react-datepicker";
import { ViaticosLayout } from "../layout/ViaticosLayout"
import '../styles/CapturarViaticos.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useOficinasStore } from "../../hooks";

export const CapturarViaticos = () => {

  const [startDate, setStartDate] = useState( new Date() )

  const { isLoading ,oficinas, startLoadingOficinas } = useOficinasStore();

  useEffect(() => {
     startLoadingOficinas();
    
  }, [])
  

  return (
    <ViaticosLayout>
        <div className="capturar-viaticos">
            <div className="header">
                <div className="row">
                    <div className="col-md-2">
                      <label htmlFor="empleado" className="form-label mb-2">EMPLEADO</label>
                      <input className="form-control form-control-sm" value="7148" type="text" name="empleado" title="empleado" />
                    </div>
                    <div className="col-md-8">
                       <span className=" d-block text-decoration-underline">CARLOS ALBERTO MALDONADO VERDIN</span>
                       <span className="d-block">OFICINA DE INFORMATICA</span>
                       <span className="d-block">PROGRAMADOR</span>
                    </div>
                </div>
                <div className="row mt-2">
                   <div className="col-md-4">
                    <button
                       type="button"
                       className="btn btn-outline-primary btn-sm"
                       title="Buscar Empleados">
                          Buscar en Catalogo
                      </button>
                   </div>
                </div>
            </div>
            
            <hr />

            {/* //TODO: Envolver en un Form */}


            <div className="container px-4">
              <div className="row gx-4">

                  <Formik
                        initialValues={{
                          idoficina:1,
                          ejercicio:2023,
                          fecha: new Date(),
                          empleado:0,
                          estatus:0,
                          noviat:0,
                          fechasal: "",
                          fechareg: "",
                          dias:0,
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
                        () => (
                          <Form>
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
                                  <Field name="ejercicio" type="text" className="form-control"/>
                                  <label htmlFor="ejercicio">Ejercicio</label>
                                </div>
                              </div>

                          </Form>
                        )
                      }

                 </Formik>

            </div>
        </div>
        
      </div>
    </ViaticosLayout>
  )
}
