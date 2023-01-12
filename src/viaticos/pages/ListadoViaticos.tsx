
import { ViaticosLayout } from "../layout/ViaticosLayout"
import { Viaticos } from '../../interfaces/interfaces';
import { TableListadoViaticos } from "../components";

export const ListadoViaticos = () => {

  return (
   <ViaticosLayout>
        <div className="listado-viaticos">
            <TableListadoViaticos ejercicio={ 2022 } empleado={ 86 } />
        </div>
   </ViaticosLayout>
  )
}
