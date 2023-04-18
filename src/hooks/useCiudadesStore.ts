import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api"
import { Ciudades } from "../interfaces/interfaces"
import { onGetCiudadById, onListCiudades } from "../store/ciudades/ciudadesSlice"
import { RootState } from "../store/store"


export const useCiudadesStore = () => {

    type Response = {
        data: Ciudades[]
    }

    const { isLoading, ciudades, ciudad } = useSelector( ( state: RootState ) => state.ciudades );
    const dispatch = useDispatch();

    const startLoadingCiudades = async() => {
        try {
            const { data } = await viaticosApi.get<Response>(`/Ciudades`);
            dispatch( onListCiudades( data ));
            
        } catch (error) {
            console.log({ error });
        }
    }

    const startLoadingCiudadById = async( id:number ) => {
        try {
            const { data } = await viaticosApi.get(`/Ciudades/ByIdestado/${ id }`);
            console.log(data);
            dispatch( onGetCiudadById( data ));
            
        } catch (error) {
            console.log({error});
        }
    }

    return {
        isLoading,
        ciudades,
        ciudad,
        startLoadingCiudades,
        startLoadingCiudadById
    }
}