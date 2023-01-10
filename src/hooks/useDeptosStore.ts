import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { viaticosApi } from "../api";
import { onListDeptos } from "../store/deptos/deptosSlice";
import { Deptos } from "../interfaces/interfaces";


export const useDeptosStore = () => {
    const { deptos } = useSelector( ( state: RootState ) => state.deptos);
    const dispatch = useDispatch();

    type Response = {
        data: Deptos[]
    }

    const startLoadingDeptos = async() => {
       try {
        const { data } = await viaticosApi.get<Response>('/Deptos');
        console.log( { data } );
        //dispatch( onListDeptos( deptos ));
        
         //dispatch( onListDeptos( deptos ) );
       } catch (error) {
         console.log( { error });
       }
    }

    return {
        deptos,
        startLoadingDeptos,
    }

}