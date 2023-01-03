import { ViaticosLayout } from "../layout/ViaticosLayout"
import '../styles/CapturarViaticos.css';

export const CapturarViaticos = () => {
  return (
    <ViaticosLayout>
        <div className="capturar-viaticos">
            <div className="header">
                <div className="row">
                  <label htmlFor="empleado" className="col-sm-2 col-form-label">EMPLEADO</label>
                  <div className="col-sm-2">
                    <input type="text" title='empleado' className="form-control" id="empleado" value="7120"/>
                  </div>
                  <div className="col-sm-4">
                    <span>MANUEL REYES RAMIREZ</span>
                    <br />
                    <span className="mt-5">COORDINACION DE INFORMATICA</span>
                    <br />
                    <span className="mt-3">COORDINADOR DE INFORMATICA</span>
                  </div>
                </div>
            </div>
        </div>
    </ViaticosLayout>
  )
}
