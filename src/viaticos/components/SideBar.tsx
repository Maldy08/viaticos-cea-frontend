import { NavLink } from 'react-router-dom';
import { useState } from "react";
import '../styles/SideBar.css';
import logo from '../../assets/logo.png';
import { useEmpleadosStore, useLocalData, useUiStore } from '../../hooks';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';


export const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { noEmpleado, viaticosNivel } = useLocalData();
  const { empleadoModalSelected } = useUiStore();
  const { empleado } = useEmpleadosStore();

  const toggle = () => setIsOpen(!isOpen);
  const ejercicio = localStorage.getItem('ejercicio')
  const empleadoActivoId = empleadoModalSelected || noEmpleado;
  const isEmpleadoSeleccionado = !!empleadoModalSelected && empleadoModalSelected !== noEmpleado;
  const empleadoActivoNombre = (empleado?.empleado === empleadoActivoId) ? empleado?.nombreCompleto : '';

  return (
    <Navbar expand="lg" className='vertical-nav py-3 px-2'>
      <NavbarToggler onClick={toggle} aria-label="Toggle sidebar" className="sidebar-toggle">
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>

        <Nav className="sidebar-nav nav flex-column" navbar>
          <div className="sidebar-brand">
            <img src={logo} alt="Comision Estatal del Agua" />
          </div>

          <NavLink className='menu-principal' to='/'>
            <i className="fa-solid fa-house sidebar-icon" aria-hidden="true"></i>
            <span>Principal</span>
          </NavLink>

          {
            viaticosNivel === 9 ?
              <div className='empleado-activo'>
                <span>Empleado activo</span>
                <strong>{empleadoActivoId}</strong>
                {empleadoActivoNombre ? <small>{empleadoActivoNombre}</small> : null}
                {isEmpleadoSeleccionado ? <small>(Seleccionado)</small> : null}
              </div> : null
          }

          <NavItem>
            <NavLink className={({ isActive }) => isActive ? 'nav-link sidebar-link activo mt-2' : 'nav-link sidebar-link guinda'} to='/capturar-viatico'>
              <i className="fa-solid fa-file sidebar-icon" aria-hidden="true"></i>
              <span className='sidebar-text'>Capturar</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={({ isActive }) => isActive ? 'nav-link sidebar-link activo' : 'nav-link sidebar-link guinda'} to='/listado-viaticos'>
              <i className="fa-regular fa-folder-open sidebar-icon" aria-hidden="true"></i>
              <span className='sidebar-text'>Listado</span>
            </NavLink>
          </NavItem>
          <hr />
          <NavItem>
            <NavLink className={({ isActive }) => isActive ? 'nav-link sidebar-link activo' : 'nav-link sidebar-link guinda'} to='/cambiar-password'>
              <i className="fa-solid fa-lock sidebar-icon" aria-hidden="true"></i>
              <span className='sidebar-text'>Cambiar contraseña</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className={({ isActive }) => isActive ? 'nav-link sidebar-link activo' : 'nav-link sidebar-link guinda'} to='/cerrar-sesion'>
              <i className="fa-solid fa-right-from-bracket sidebar-icon" aria-hidden="true"></i>
              <span className='sidebar-text'>Cerrar Sesion</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className="nav-link sidebar-link guinda" to='/'>
              <i className="fa-regular fa-calendar sidebar-icon" aria-hidden="true"></i>
              <span className='sidebar-text'>Ejercicio: {ejercicio}</span>
            </NavLink>
          </NavItem>

        </Nav>
      </Collapse>
    </Navbar>
  )
}
