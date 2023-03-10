import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { Viaticos } from "../interfaces/interfaces";
import { RootState } from "../store/store"
import { onAddNewViatico, onGetConsecutivo, onGetFormatoComision, onGetViaticoEjercicioOficinaNoviat, onListViaticosByEmpleado, onUpdateViatico } from "../store/viaticos/viaticosSlice";


export const useViaticosStore = () => {

    const { isLoading, listviaticos, viatico, errorMessage, consecutivo, formatoComision } = useSelector( ( state: RootState ) => state.viaticos );
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

    const startAddNewViatico = async ( data: Viaticos )  => {

        try {

            const { data: viatico } = await viaticosApi.post<Viaticos>(`/Viaticos`, data );
            dispatch( onAddNewViatico( { ...viatico } ) )
          
            //console.log({viatico});
            
        } catch (error) {
            
            console.log( error );
            throw new Error("Error al agregar Viatico");
        }

    }

    
    const startGetFormatoComision = async ( oficina:number, ejercicio:number, noviat:number ) => {
        try {
            const { data } = await viaticosApi.get(`/Viaticos/formato-comision/${ oficina }/${ ejercicio }/${ noviat }`);
            dispatch( onGetFormatoComision( data ) );
            
        } catch (error) {
            console.log( error );
            throw new Error("Error");
        }
    }

    const startGetViaticoByEjercicioOficinaNoviat = async ( oficina:number, ejercicio:number, noviat: number) => {
        try {
            const { data } = await viaticosApi.get(`/Viaticos/${ ejercicio }/${ oficina }/${ noviat }`);
           //console.log(data);
            dispatch( onGetViaticoEjercicioOficinaNoviat( data ));
            
        } catch (error) {
            console.log( error );
            throw new Error("Error");
        }
    }

    const startUpdateViatico = async (viatico: Viaticos ) => {

        try {
            const { data } = await viaticosApi.put(`/Viaticos`,viatico);
            dispatch( onUpdateViatico( { ...data}));

        } catch (error) {
            console.log(error);
            throw new Error("Error");
            
        }

    }

    return {
        isLoading,
        consecutivo,
        viatico,
        listviaticos,
        formatoComision,
        errorMessage,
        startLoadingViaticosByEmpleado,
        startGetConsecutivo,
        startAddNewViatico,
        startGetFormatoComision,
        startGetViaticoByEjercicioOficinaNoviat,
        startUpdateViatico
    }


}