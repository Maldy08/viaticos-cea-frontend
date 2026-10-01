import '../styles/Header.css';
import { useLocalData } from "../../hooks";
import { NavLink } from 'react-router-dom';
import { useAuthStore } from "../../hooks";


export const Header = () => {

  const { status } = useAuthStore();
  let nombreUsuario;
  if( status === 'authenticated'){
    let { nombreCompleto } = useLocalData();
    nombreUsuario = nombreCompleto;
  } else {
    nombreUsuario = null;
  }

  return (
    <header className="headercea">
      <nav className="headercea-nav">
        <span className="headercea-title">Sistema de Control de Viaticos</span>
        {(nombreUsuario != null) && 
          <div className='headercea-user'>
            <div className="headercea-user-copy">
              <span>Usuario</span>
              <strong>{nombreUsuario}</strong>
            </div>
              <NavLink className='guinda-header-buton' to='/cerrar-sesion' aria-label="Cerrar sesion">
              <i className="fa-solid fa-right-from-bracket"></i>
              </NavLink>
          </div>
        }
      </nav>
    </header>
  )
}
