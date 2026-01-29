import { useDispatch, useSelector } from "react-redux";
import { onGetCiudadById, onListCiudades } from "../store/ciudades/ciudadesSlice";
import type { RootState } from "../types/store/store.types";
import type { ID } from "../types/common/base.types";
import { ciudadesRepository } from '../services/repositories';

export const useCiudadesStore = () => {
  const { isLoading, ciudades, ciudad } = useSelector((state: RootState) => state.ciudades);
  const dispatch = useDispatch();

  const startLoadingCiudades = async (): Promise<void> => {
    try {
      const data = await ciudadesRepository.getAll();
      dispatch(onListCiudades(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  const startLoadingCiudadById = async (id: ID): Promise<void> => {
    try {
      const data = await ciudadesRepository.getById(id);
      console.log(data);
      dispatch(onGetCiudadById(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    isLoading,
    ciudades,
    ciudad,
    startLoadingCiudades,
    startLoadingCiudadById
  };
};