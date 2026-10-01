import { ViaticosLayout,  } from "../layout/ViaticosLayout"
import { NavLink } from 'react-router-dom';
import '../styles/ViaticosPage.css';

export const ViaticosPage = () => {

  return (
    <ViaticosLayout >
      <div className="viaticos-home">
        <section className="home-hero">
          <div>
            <span className="home-kicker">Menu Principal</span>
            <h1>Sistema de Control de Viaticos</h1>
            <p>Selecciona una opcion para comenzar la captura o consulta de movimientos.</p>
          </div>
          <div className="home-year">
            <span>Ejercicio</span>
            <strong>{ localStorage.getItem('ejercicio') || new Date().getFullYear() }</strong>
          </div>
        </section>

        <section className="home-actions" aria-label="Accesos principales">
          <NavLink className='home-action btn-guinda' to='/capturar-viatico'>
            <span className="home-action-icon">
              <i className="fa-solid fa-file icono"></i>
            </span>
            <span className='letra'>Capturar viaticos</span>
            <span className="home-action-copy">Registra una nueva solicitud de viaticos.</span>
          </NavLink>
          <NavLink className='home-action btn-guinda' to='/listado-viaticos'>
            <span className="home-action-icon">
              <i className="fa-regular fa-folder-open icono"></i>
            </span>
            <span className='letra'>Consultar viaticos</span>
            <span className="home-action-copy">Consulta, revisa y da seguimiento a capturas existentes.</span>
          </NavLink>
        </section>
      </div>
    </ViaticosLayout>
  )
}

