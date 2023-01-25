import { useDispatch, useSelector } from "react-redux"
import { number } from "yup";
import { viaticosApi } from "../api";
import { Viaticos } from "../interfaces/interfaces";
import { RootState } from "../store/store"
import { onAddNewViatico, onError, onGetConsecutivo, onListViaticosByEmpleado } from "../store/viaticos/viaticosSlice";


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

    const startGetConsecutivo = async ( ejercicio:number, oficina:number ) : Promise<any> => {

        try {
            const { data } = await viaticosApi.get(`/Viaticos/get-consecutivo/${ ejercicio }/${ oficina }`)
            dispatch( onGetConsecutivo( data ));
            return (data);
            //console.log( data );
            
        } catch ( error:any ) {

            console.log( { error } );
            throw new Error("Error al obtener el numero de consecutivo.");
            
        }
    }

    const startAddNewViatico = async ( viatico: Viaticos ) => {

        try {

            const { data } = await viaticosApi.post(`/Viaticos`, viatico );
            dispatch( onAddNewViatico( { viatico } ) )
            
        } catch (error) {
            
            console.log( error );
            throw new Error("Error al agregar Viatico");
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
        startAddNewViatico
    }


}