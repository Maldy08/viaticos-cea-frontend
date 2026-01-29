import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/store/store.types";
import { onListPaises } from "../store/paises/paisesSlice";
import { paisesRepository } from '../services/repositories';

export const usePaisesStore = () => {
  const { isLoading, paises } = useSelector((state: RootState) => state.paises);
  const dispatch = useDispatch();

  const startLoadingPaises = async (): Promise<void> => {
    try {
      const data = await paisesRepository.getAll();
      dispatch(onListPaises(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    isLoading,
    paises,
    startLoadingPaises,
  };
};