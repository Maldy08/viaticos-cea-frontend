import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

export const SideBar = () => {
  return (
          <div className="vertical-nav" id="sidebar">
                <div className="py-4 px-3 mb-4">
              
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Menu Principal</p>
                  
                    <ul className="nav flex-column bg-white mb-0">

                      <li className="nav-item">
                        <Link className='nav-link text-dark' to='/capturar-viatico'>
                        <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                          Capturar
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                        <i className="fa fa-cubes mr-3 text-primary fa-fw"></i>
                          Listado
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                        <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                            Imprimir Formato
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                        <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                            Capturar Informe
                        </a>
                      </li>
                      
                    </ul>
              </div>
        </div>
  )
}
