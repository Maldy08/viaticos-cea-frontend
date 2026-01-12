import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { viaticosApi } from "../api";
import { onGetDeptoById, onListDeptos } from "../store/deptos/deptosSlice";
import { Deptos } from '../interfaces/interfaces';


export const useDeptosStore = () => {
    const { deptos, isLoadingDeptos } = useSelector( ( state: RootState ) => state.deptos);
    const dispatch = useDispatch();

    type Response = {
        data: Deptos[]
    }

    type ResponseById = {
        data: Deptos;
    }

    const startLoadingDeptos = async() => {
       try {
        const { data } = await viaticosApi.get<Response>('/api/Departamentos');
       
        dispatch( onListDeptos( data ));
        
       } catch (error) {
         console.log( { error });
       }
    }

    const startLoadingDeptoById = async( id: number) => {
      try {
         const { data } = await viaticosApi.get<ResponseById>(`api/Departamentos/GetDeptoById/${ id }`);
         dispatch( onGetDeptoById( data ));
        
      } catch (error) {
        console.log({ error });
      }
    }

    return {
        deptos,
        startLoadingDeptos,
        startLoadingDeptoById,
        isLoadingDeptos,
    }

}