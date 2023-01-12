import moment from "moment"
import { useEffect } from "react";
import DataTable, {createTheme} from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";
import { Loading } from "../../ui";

import { ViaticosLayout } from "../layout/ViaticosLayout"

export const ListadoViaticos = () => {
    
    const { viaticos, isLoading , startLoadingViaticosByEmpleado } = useViaticosStore();

    if( isLoading ){
        <Loading/>
    }

    useEffect(() => {
    
      startLoadingViaticosByEmpleado( 2022,86 );
    }, [])
    
    

  return (
   <ViaticosLayout>
        <div className="listado-viaticos">
            <code>{ JSON.stringify( viaticos ) }</code>
        </div>
   </ViaticosLayout>
  )
}
