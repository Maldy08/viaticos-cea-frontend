import DatePicker  from "react-datepicker";
import { ViaticosLayout } from "../layout/ViaticosLayout"
import '../styles/CapturarViaticos.css';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


export const CapturarViaticos = () => {

  const [startDate, setStartDate] = useState( new Date() )

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

                  <div className="col">
                    <div className="form-floating">
                      <select aria-label='oficina' className='form-select text-uppercase' name="oficina" id="oficina">
                        <option value="1">Mexicali</option>
                        <option value="2">Arct</option>
                        <option value="3">Tijuana</option>
                        <option value="4">Direccion general</option>
                      </select>
                      <label htmlFor="oficina">Oficina</label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating">
                        <input className="form-control" type="text" name="ejercicio" title="ejercicio" value="2023" />
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
                              selected={startDate} 
                              onChange={(date:any) => setStartDate(date)}
                          />
                        </div>
                      </div>
                  </div>
                  
                  <div className="col">
                    <div className="form-floating">
                        <input className="form-control" type="text" name="empleado2" title="empleado2" value="7148" />
                        <label htmlFor="empleado2">Empleado</label>
                    </div>
                  </div>

                  <div className="col-md-1">
                    <div className="form-floating">
                        <input className="form-control" type="text" name="estatus" title="estatus" value="1" />
                        <label htmlFor="empleado2">Estatus</label>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-floating">
                        <input className="form-control" type="text" name="numeroViatico" title="numeroViatico" value="1233" />
                        <label htmlFor="empleado2">No. Viatico</label>
                    </div>
                  </div>

              </div>
           
              <div className="row gx-4 mt-3">
                  <div className="col">
                        <div className="form-floating">
                          <div className="p-0">
                            <label className="fecha">Fecha de Salida</label>
                            <DatePicker 
                                name="fecha"
                                title="fecha"
                                className="form-control"
                                selected={startDate} 
                                onChange={(date:any) => setStartDate(date)}
                            />
                          </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-floating">
                          <div className="p-0">
                            <label className="fecha">Fecha de Regreso</label>
                            <DatePicker 
                                name="fecha"
                                title="fecha"
                                className="form-control"
                                selected={startDate} 
                                onChange={(date:any) => setStartDate(date)}
                            />
                          </div>
                        </div>
                    </div>

                    <div className="col-md-1">
                        <div className="form-floating">
                            <input className="form-control" type="text" name="dias" title="dias" value="1" />
                            <label htmlFor="empleado2">Dias</label>
                        </div>
                    </div>

                    <div className="col">
                      <div className="form-floating">
                        <select aria-label='origen' className='form-select text-uppercase' name="origen" id="origen">
                          <option value="1">Mexicali</option>
                          <option value="2">Tijuana</option>
                        </select>
                        <label htmlFor="origen">Ciudad de Origen</label>
                      </div>
                  </div>

                    <div className="col">
                      <div className="form-floating">
                        <select aria-label='destino' className='form-select text-uppercase' name="destino" id="destino">
                            <option value="1">Mexicali</option>
                            <option value="2">Tijuana</option>
                            <option value="2">Ensenada</option>
                            <option value="2">Tecate</option>
                            <option value="2">San Quintin</option>
                            <option value="2">San Luis R.C.</option>
                            <option value="2">Ciudad de Mexico</option>
                            <option value="2">Guadalaja</option>
                        </select>
                        <label htmlFor="destino">Ciudad Destino</label>
                      </div>
                    </div>

                    <div className="col">
                        <div className="p-3">
                            <button
                               type="button"
                               title="Ver Catalogo de Ciudades"
                               className="btn btn-outline-primary btn-sm">
                                Ver Catalogo
                            </button> 
                        </div>
                    </div>


              </div>

              <div className="row d-block mt-3">
                  <div className="col">
                      <div className="form-floating">
                          <textarea
                             className="form-control" 
                             placeholder="Titulo de la Comision" 
                             id="tituloComision"
                             style={{ fontSize: '14px'}}
                            />
                          <label htmlFor="tituloComision">Titulo de la Comision</label>
                      </div>
                  </div>

                  <div className="col mt-3">
                      <div className="form-floating">
                          <textarea 
                              className="form-control" 
                              placeholder="Actividades" 
                              id="actividades"
                              style={{ height: '100px', fontSize: '14px'}}
                            />
                          <label htmlFor="actividades">Actividades</label>
                      </div>
                  </div>
              </div>
              
              <hr />

              <div className="row gx-4 mt-3">
                <div className="col">
                  <table className="table table-bordered table-sm">
                      <thead className="text-center btn-primario">
                          <tr>
                              <th></th>
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
                              <td><button type="button" className="btn btn-outline-danger btn-sm">Eliminar</button></td>
                              <td>37501</td>
                              <td>VIATICOS EN EL PAIS</td>
                              <td>230.00</td>
                              <td>1</td>
                              <td>2023</td>
                              <td>0</td>
                          </tr>
                          <tr><td><button type="button" className="btn btn-outline-danger btn-sm">Eliminar</button></td>
                              <td>37501</td>
                              <td>VIATICOS EN EL PAIS</td>
                              <td>230.00</td>
                              <td>1</td>
                              <td>2023</td>
                              <td>0</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>

            </div>
        </div>
    </ViaticosLayout>
  )
}
