import { NavLink } from 'react-router-dom';
import { useState } from "react";
import '../styles/SideBar.css';
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
    <Navbar expand="lg" className='vertical-nav bg-light py-3 px-2'>
      <NavbarToggler onClick={toggle} aria-label="Toggle sidebar" />
      <Collapse isOpen={isOpen} navbar>

        <Nav className="sidebar-nav nav flex-column bg-light" navbar>
          <NavLink className='text-gray font-weight-bold px-2 small pb-4 mt-2 menu-principal' to='/'>
            <span>Menu Principal</span>
          </NavLink>

          {
            viaticosNivel === 9 ?
              <div className='mx-2 mb-2 p-2 activo rounded small'>
                <div><b>Empleado activo:</b> {empleadoActivoId}</div>
                {empleadoActivoNombre ? <div className='small'>{empleadoActivoNombre}</div> : null}
                {isEmpleadoSeleccionado ? <div className='small'>(seleccionado)</div> : null}
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
              <span className='sidebar-text'>Ejercicio: {ejercicio}</span>
            </NavLink>
          </NavItem>

        </Nav>
      </Collapse>
    </Navbar>
  )
}