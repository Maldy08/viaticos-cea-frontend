import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { viaticosApi } from '../api/viaticosApi';
import { onGetEstadoById, onGetEstados } from '../store/estados/estadosSlice';


export const useEstadosStore = () => {

    const { estados, isLoading } = useSelector( ( state: RootState ) => state.estados );
    const dispatch = useDispatch();

    const startLoadingEstados = async() => {
        try {
            const { data } = await viaticosApi.get(`/Estados`);
            dispatch( onGetEstados( data ));
            
        } catch (error) {
            throw new Error("Error al cargar el listado de estados.")
        }
    }

    const startLoadingEstadoById = async( id: number ) => {
        try {
            const { data } = await viaticosApi.get(`/Estados/ByIdEstado/${ id }`)
            dispatch( onGetEstadoById( data ));
            
        } catch (error) {
            throw new Error("Error al cargar el estado.")
        }
    }

    return {
        estados,
        isLoading,
        startLoadingEstados,
        startLoadingEstadoById,
    }
}