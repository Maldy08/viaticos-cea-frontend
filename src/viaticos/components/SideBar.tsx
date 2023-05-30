import { NavLink } from 'react-router-dom';
import { useState } from "react";
import '../styles/SideBar.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';


export const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar expand="lg" className='vertical-nav py-3 px-2'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        
          <Nav className="nav flex-column bg-white" navbar>
              <NavLink className='text-gray font-weight-bold px-2 small pb-4 mt-2 menu-principal' to='/'>
                  <span>Menu Principal</span>
              </NavLink>
            
            <NavItem>
              <NavLink className={ ({ isActive }) => isActive ? 'nav-link activo mt-2': 'nav-link guinda' } to='/capturar-viatico'>
                <i className="fa-solid fa-file mr-3"></i>
                  <span className='m-1'>Capturar</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={ ({ isActive }) => isActive ? 'nav-link activo': 'nav-link guinda' } to='/listado-viaticos'>
                <i className="fa-regular fa-folder-open"></i>
                <span className='m-1'>Listado</span>
              </NavLink>
            </NavItem>
            <hr/>
            <NavItem>
              <NavLink className={ ({ isActive }) => isActive ? 'nav-link activo': 'nav-link guinda' } to='/cerrar-sesion'>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className='m-1'>Cerrar Sesion</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  )
}