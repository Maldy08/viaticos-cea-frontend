import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { Viaticos } from "../interfaces/interfaces";
import { RootState } from "../store/store"
import {
     onAddNewViatico, 
     onGetConsecutivo, 
     onGetFormatoComision, 
     onGetViaticoEjercicioOficinaNoviat, 
     onListViaticosByEmpleado, 
     onResetData, 
     onUpdateViatico,
    }
     from "../store/viaticos/viaticosSlice";


export const useViaticosStore = () => {

    const { isLoading, listviaticos, viatico, errorMessage, consecutivo, formatoComision } = useSelector( ( state: RootState ) => state.viaticos );
    const dispatch = useDispatch();

    const startLoadingViaticosByEmpleado = async ( ejercicio:number, empleado:number ) => {

        try {
            const { data } = await viaticosApi
                .get(`api/Viatico/ListaViaticosPorEmpleado/${ ejercicio }/${ empleado }`);

                dispatch( onListViaticosByEmpleado( data.data ));
            
        } catch ( error:any ) {

            console.log( { error } );
            throw new Error("Error al obtener el listado de viaticos por empleado.");
            
        }

    }

    const startGetConsecutivo = async ( ejercicio:number, oficina:number ) : Promise<any> => {

        try {
            const { data } = await viaticosApi.get(`api/Viatico/GetNoViat/${ ejercicio }/${ oficina }`)
            dispatch( onGetConsecutivo( data.data ));
            return (data.data);
            //console.log( data );
            
        } catch ( error:any ) {

            console.log( { error } );
            throw new Error("Error al obtener el numero de consecutivo.");
            
        }
    }

    const startAddNewViatico = async ( data: Viaticos )  => {
        try {

            const { data: viatico } = await viaticosApi.post<Viaticos>(`api/Viatico`, data );
            dispatch( onAddNewViatico( { ...viatico } ) )
          
            //console.log({viatico});
            
        } catch (error) {
            
            console.log( error );
            throw new Error("Error al agregar Viatico");
        }
    }

    
    const startGetFormatoComision = async ( oficina:number, ejercicio:number, noviat:number ) => {
        try {
            const { data } = await viaticosApi.get(`api/Viatico/FormatoComision/${ oficina }/${ ejercicio }/${ noviat }`);
            dispatch( onGetFormatoComision( data.data ) );
            
        } catch (error) {
            console.log( error );
            throw new Error("Error");
        }
    }

    const startGetViaticoByEjercicioOficinaNoviat = async ( oficina:number, ejercicio:number, noviat: number) => {
        try {
            const { data } = await viaticosApi.get(`api/Viatico/GetAllByEjercicioOficinaNoviat/${ ejercicio }/${ oficina }/${ noviat }`);
           //console.log(data);
            dispatch( onGetViaticoEjercicioOficinaNoviat( data.data ));
            
        } catch (error) {
            console.log( error );
            throw new Error("Error");
        }
    }

    const startUpdateViatico = async (viatico: Viaticos ) => {

        try {
            const { data } = await viaticosApi.put(`api/Viatico`,viatico);
            dispatch( onUpdateViatico( { ...data}));

        } catch (error) {
            console.log(error);
            throw new Error("Error");
            
        }
    }

    const startResetData = () => {
        dispatch( onResetData() );
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
        startUpdateViatico,
        startResetData,
    }
}