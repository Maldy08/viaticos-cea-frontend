import { useDispatch, useSelector } from "react-redux";
import { onListOficinas } from "../store/oficinas/oficinasSlice";
import type { RootState } from "../types/store/store.types";
import { oficinasRepository } from '../services/repositories';

export const useOficinasStore = () => {
  const { oficinas, isLoading } = useSelector((state: RootState) => state.oficinas);
  const dispatch = useDispatch();

  const startLoadingOficinas = async (): Promise<void> => {
    try {
      const data = await oficinasRepository.getAll();
      dispatch(onListOficinas(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    oficinas,
    isLoading,
    startLoadingOficinas,
  };
};