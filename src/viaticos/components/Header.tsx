import logo from '../../assets/logo.png';
import { useAuthStore } from '../../hooks';
import '../styles/Header.css';

export const Header = () => {

  const { startLogOut } =useAuthStore();

  const logOutHanlder = () => {
     startLogOut();
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={ logo } alt="logo" />
        {/* <div className='titulo'>Sistema de Control de Viaticos</div> */}
      </div>
      <div className="navbar-right">
        {/* <button type='button' className='btn btn-primary' onClick={ logOutHanlder }>Cerrar sesion</button> */}
{/*          <div className="dropdown">
            <button 
              className='btn btn-secondary dropdown-toggle'
              type='button'
              id='dropdownMenuButton1'
            >
              Usuario
            </button>
            <ul className="dropdown-menu" aria-labelledby='dropdownMenuButton1'>
                <li><a className='dropdown-item' href="#">Cerrar sesion</a></li>
            </ul>
         </div> */}
      </div>
    </div>
  )
}
