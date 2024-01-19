
import { ViaticosLayout } from "../layout/ViaticosLayout"
import { TableListadoViaticos } from "../components";
import { useLocalData } from "../../hooks";
import "../styles/ListadoViaticos.css"

export const ListadoViaticos = () => {

 // const  data  = JSON.parse( localStorage.getItem('data' ) || '{ }');
  const ejercicio =  + localStorage.getItem('ejercicio')!;
  //const empleado = 86
  const { noEmpleado } = useLocalData();
  // data.userData.noEmpleado;

  return (
   <ViaticosLayout>
        <div className="listado-viaticos">
            <TableListadoViaticos ejercicio={ ejercicio } empleado={ noEmpleado } />
        </div>
   </ViaticosLayout>
  )
}
