import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useEmpleadosStore, useLocalData, useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '720px',
    maxWidth: '95vw',
    maxHeight: '80vh',
    padding: '0',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');

export const EmpleadosModal = () => {

  const { isEmpleadosModalOpen, closeEmpleadosModal, selectEmpleadoModal } = useUiStore();
  const { empleados, startLoadingEmpleadosByDepto, isLoading:isLoadingEmpleados, startLoadingEmpleadoById } = useEmpleadosStore();
  const { depto } = useLocalData()

  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<number>(0);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
      startLoadingEmpleadosByDepto( depto )
  }, [])

  useEffect(() => {
    if (!isEmpleadosModalOpen) {
      setSelectedEmpleadoId(0);
      setIsSelecting(false);
    }
  }, [isEmpleadosModalOpen]);
  
    const onSelectRow = async ( empleadoId:number ) => {
      try {
        setSelectedEmpleadoId(empleadoId);
        setIsSelecting(true);
        selectEmpleadoModal(empleadoId);
        await startLoadingEmpleadoById( empleadoId );
        closeEmpleadosModal();
      } catch (error) {
        alert('No fue posible cargar el empleado seleccionado.');
      } finally {
        setIsSelecting(false);
      }
    }

    const rows = useMemo(() => {
      return (empleados || [])
        .map((row: any) => {
          const empleadoId = row?.idEmpleado ?? row?.empleado ?? row?.noEmpleado ?? row?.id;
          if (!empleadoId) return null;

          return {
            empleadoId,
            nombre: row?.nombre ?? '',
            paterno: row?.paterno ?? '',
            materno: row?.materno ?? '',
          };
        })
        .filter(Boolean) as Array<{ empleadoId: number; nombre: string; paterno: string; materno: string }>;
    }, [empleados]);

  return (
    <Modal
      isOpen={ isEmpleadosModalOpen }
      style={ customStyles }
      shouldCloseOnEsc
      onRequestClose={ closeEmpleadosModal }
      
    >

      <div className="modal-empleados d-flex flex-column" style={{ height: '40vh', maxHeight: '80vh' }}>
        <div className="d-flex justify-content-between align-items-start px-3 pt-3">
          <div>
            <h4 className="m-0">Empleados</h4>
            <small className="text-muted">
              {isLoadingEmpleados ? 'Cargando listado…' : `Registros: ${rows.length}`}
            </small>
            {isSelecting && selectedEmpleadoId ? (
              <div className="mt-1">
                <small className="text-muted">Cargando empleado {selectedEmpleadoId}…</small>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={ closeEmpleadosModal }
          />
        </div>
        <hr className="my-2" />

        <div className="px-3 pb-3" style={{ overflow: 'auto' }}>
          <table className='table table-sm table-hover align-middle'>
            <thead
              className="bg-white"
              style={{ position: 'sticky', top: 0, zIndex: 2 }}
            >
              <tr className='text-center'>
                <th style={{ width: '120px' }}>Empleado</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px', cursor: isSelecting ? 'progress' : 'pointer', opacity: isSelecting ? 0.75 : 1 }}>
              {
                isLoadingEmpleados ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-muted">
                      Cargando…
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-muted">
                      No hay empleados para mostrar.
                    </td>
                  </tr>
                ) : (
                  rows.map(({ empleadoId, nombre, paterno, materno }) => (
                    <tr
                      key={ empleadoId }
                      className={ selectedEmpleadoId === empleadoId ? 'table-active' : '' }
                      onClick={ () => !isSelecting && onSelectRow( empleadoId ) }
                      onDoubleClick={ () => !isSelecting && onSelectRow( empleadoId ) }
                      title="Click para seleccionar"
                    >
                      <th scope='row' className="text-center">{ empleadoId }</th>
                      <td>{ nombre } {paterno} { materno }</td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>

    </Modal>
  )
}
