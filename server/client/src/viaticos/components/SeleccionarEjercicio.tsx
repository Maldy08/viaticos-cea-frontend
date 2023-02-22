import '../styles/SeleccionarEjercicio.css';

export const SeleccionarEjercicio = () => {
  return (
    <div className="seleccionar-ejercicio">
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <div className="conteneder-ejercicio">
            <div className='titulo'>
             <h5>Ejercicio en Proceso</h5>
            </div>
            <form className='login-form-1'>
                <div className="form-group">
                    <select aria-label='ejercicio'  className='form-select' name="ejercicio" id="ejercicio">
                        <option value="2022">2022</option>
                        <option value="2022">2023</option>
                    </select>
                </div>
                <div className="d-grid gap-2">
                    <input 
                        type="submit"
                        className="btnSubmit"
                        value="Aceptar" 
                      />
                </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
