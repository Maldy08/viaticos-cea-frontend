import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { Oficina } from "../interfaces/interfaces";
import { onListOficinas } from "../store/oficinas/oficinasSlice";
import { RootState } from "../store/store"


export const useOficinasStore = () => {

    type Response = {
        data: Oficina[]
    }

    const { oficinas, isLoading } = useSelector( ( state: RootState ) => state.oficinas );
    const dispatch = useDispatch();

    const startLoadingOficinas = async() => {
        try {

            const { data } = await viaticosApi.get<Response>(`api/Oficinas`);
            dispatch( onListOficinas( data.data ));
            
        } catch (error) {
            console.log({ error });
        }
    }

    return {
        oficinas,
        isLoading,
        startLoadingOficinas,
    }
}