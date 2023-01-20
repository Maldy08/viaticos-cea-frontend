import { useEffect } from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { useEmpleadosStore, useLocalData, useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const EmpleadosModal = () => {

  const { isEmpleadosModalOpen, closeEmpleadosModal } = useUiStore();
  const { empleados, startLoadingEmpleadosByDepto, isLoading:isLoadingEmpleados } = useEmpleadosStore();
  const { depto } = useLocalData()

  useEffect(() => {
      startLoadingEmpleadosByDepto( depto )
  }, [])
  
  const onDoubleClickRow = ( event:any ) => {
     console.log( { event } );
  }

  return (
    <Modal
      isOpen={ isEmpleadosModalOpen }
      style={ customStyles }
      shouldCloseOnEsc
      onRequestClose={ closeEmpleadosModal}
    >

      <h3>Empleados</h3>
      <hr />

      <div className="modal-empleados">
        <div className="header">
          <div className="container">
            <table className='table table-sm  table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>Empleado</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px', cursor: 'pointer'}}>
                  {
                    !isLoadingEmpleados && 
                     empleados.map( ({ idEmpleado, nombre, paterno, materno }) => (
                        <tr key={ idEmpleado } onDoubleClick={ onDoubleClickRow }>
                          <th scope='row'>{ idEmpleado }</th>
                          <td>{ nombre } {paterno} { materno }</td>
                        </tr>
                     ))
                  }
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </Modal>
  )
}
