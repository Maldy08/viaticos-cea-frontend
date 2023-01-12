import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { RootState } from "../store/store"
import { onError, onListViaticosByEmpleado } from "../store/viaticos/viaticosSlice";


export const useViaticosStore = () => {

    const { isLoading, viaticos, viatico, errorMessage } = useSelector( ( state: RootState ) => state.viaticos );
    const dispatch = useDispatch();

    const startLoadingViaticosByEmpleado = async ( ejercicio:number, empleado:number) => {

        try {
            const { data } = await viaticosApi
                .get(`/Viaticos/lista-viaticos-empleado/${ ejercicio }/${ empleado }`);

                dispatch( onListViaticosByEmpleado( data ));
            
        } catch ( error: any ) {
            dispatch( onError( error ) );
            console.log( { error } );
            
        }

    }

    return {
        isLoading,
        viatico,
        viaticos,
        errorMessage,
        startLoadingViaticosByEmpleado,
    }


}