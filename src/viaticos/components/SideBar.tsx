import { NavLink } from 'react-router-dom';
import '../styles/SideBar.css';

export const SideBar = () => {
  return (
          <div className="vertical-nav" id="sidebar">
                <div className="py-4 px-3 mb-4">
              
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Menu Principal</p>
                  
                    <ul className="nav flex-column bg-white mb-0">

                      <li className="nav-item">
                        <NavLink className={ ({ isActive }) => isActive ? 'nav-active nav-link': 'nav-link' } to='/capturar-viatico'>
                          <i className="fa-solid fa-file mr-3"></i>
                           <span className='m-1'>Capturar</span>
                        </NavLink>
                      </li>
{/*                       <li className="nav-item">
                        <NavLink className={ ({ isActive }) => isActive ? 'nav-active nav-link': 'nav-link' } to='/deptos'>
                          <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                            Departamentos
                        </NavLink>
                      </li> */}
                      <li className="nav-item">
                        <NavLink className={ ({ isActive }) => isActive ? 'nav-active nav-link': 'nav-link' } to='/listado-viaticos'>
                          <i className="fa-regular fa-folder-open"></i>
                            <span className='m-1'>Listado</span>
                        </NavLink>
                      </li>
                        <hr/>
                        <li className="nav-item">
                            <NavLink className={ ({ isActive }) => isActive ? 'nav-active nav-link': 'nav-link' } to='/cerrar-sesion'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span className='m-1'>Cerrar Sesion</span>
                            </NavLink>
                        </li>
{/*                       <li className="nav-item">
                        <a href="#" className="nav-link ">
                        <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                            Imprimir Formato
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link ">
                        <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                            Capturar Informe
                        </a>
                      </li> */}
                      
                    </ul>
              </div>
        </div>
  )
}
