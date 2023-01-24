import { useDispatch, useSelector } from "react-redux"
import { number } from "yup";
import { viaticosApi } from "../api";
import { RootState } from "../store/store"
import { onError, onGetConsecutivo, onListViaticosByEmpleado } from "../store/viaticos/viaticosSlice";


export const useViaticosStore = () => {

    const { isLoading, listviaticos, viatico, errorMessage, consecutivo } = useSelector( ( state: RootState ) => state.viaticos );
    const dispatch = useDispatch();

    const startLoadingViaticosByEmpleado = async ( ejercicio:number, empleado:number ) => {

        try {
            const { data } = await viaticosApi
                .get(`/Viaticos/lista-viaticos-empleado/${ ejercicio }/${ empleado }`);

                dispatch( onListViaticosByEmpleado( data ));
            
        } catch ( error:any ) {

            console.log( { error } );
            throw new Error("Error al obtener el listado de viaticos por empleado.");
            
        }

    }

    const startGetConsecutivo = async ( ejercicio:number, oficina:number ) => {

        try {
            const { data } = await viaticosApi.get(`/Viaticos/get-consecutivo/${ ejercicio }/${ oficina }`)
            dispatch( onGetConsecutivo( data ));
            
        } catch ( error:any ) {

            console.log( { error } );
            throw new Error("Error al obtener el numero de consecutivo.");
            
        }
    }

    return {
        isLoading,
        consecutivo,
        viatico,
        listviaticos,
        errorMessage,
        startLoadingViaticosByEmpleado,
        startGetConsecutivo,
    }


}