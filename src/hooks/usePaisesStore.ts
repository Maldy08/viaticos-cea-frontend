import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { viaticosApi } from "../api";
import { onListPaises } from "../store/paises/paisesSlice";

export const usePaisesStore = () => {

const { isLoading, paises } = useSelector( ( state: RootState ) => state.paises );
const dispatch = useDispatch(); 

const startLoadingPaises = async () => {

    try {

        const {data} =  await viaticosApi.get(`api/Paises`);
        dispatch( onListPaises ( data.data ));
        
    } catch (error) {
        console.log({ error });
    }


}

    return {
        isLoading,
        paises,
        startLoadingPaises,
    }

}