import { ViaticosLayout,  } from "../layout/ViaticosLayout"
import { NavLink } from 'react-router-dom';
import '../styles/ViaticosPage.css';

export const ViaticosPage = () => {

  return (
    <ViaticosLayout >
      <div className=" h-100 d-flex gap-3">
              <NavLink className='w-25 h-50 bg-white btn-guinda rounded d-flex justify-content-center align-items-center border border-2 gap-3 flex-column' to='/capturar-viatico'>
                <i className="fa-solid fa-file icono"></i>
                  <span className='letra'>Capturar viaticos</span>
              </NavLink>
              <NavLink className='w-25 h-50 bg-white btn-guinda rounded d-flex justify-content-center align-items-center border border-2 gap-3 flex-column' to='/listado-viaticos'>
                <i className="fa-regular fa-folder-open icono"></i>
                <span className='letra'>Consultar viaticos</span>
              </NavLink>
      </div>
    </ViaticosLayout>
  )
}

