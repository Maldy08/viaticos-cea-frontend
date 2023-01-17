
import { ViaticosLayout } from "../layout/ViaticosLayout"
import { Viaticos } from '../../interfaces/interfaces';
import { TableListadoViaticos } from "../components";

export const ListadoViaticos = () => {

 // const  data  = JSON.parse( localStorage.getItem('data' ) || '{ }');
  const ejercicio = 2022
  const empleado = 86
  // data.userData.noEmpleado;

  return (
   <ViaticosLayout>
        <div className="listado-viaticos">
            <TableListadoViaticos ejercicio={ ejercicio } empleado={ empleado } />
        </div>
   </ViaticosLayout>
  )
}
