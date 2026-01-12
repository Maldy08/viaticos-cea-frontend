import logo from '../../assets/logo.png';
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
    <div className="navbar headercea">
      <div className="navbar-left d-flex justify-content-between mx-1">
        <img src={ logo } alt="logo" />
        {(nombreUsuario != null) && 
          <div className='d-flex flex-row gap-2 align-items-center guinda-header'>
            <p> <span>Usuario:</span> <br /> <b> {nombreUsuario} </b></p>
              <NavLink className='guinda-header-buton' to='/cerrar-sesion'>
              <i className="fa-solid fa-right-from-bracket p-3"></i>
              </NavLink>
          </div>
        }
      </div>

    </div>
  )
}
