import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/store/store.types";
import { onGetDeptoById, onListDeptos } from "../store/deptos/deptosSlice";
import type { ID } from '../types/common/base.types';
import { departamentosRepository } from '../services/repositories';

export const useDeptosStore = () => {
  const { deptos, isLoadingDeptos } = useSelector((state: RootState) => state.deptos);
  const dispatch = useDispatch();

  const startLoadingDeptos = async (): Promise<void> => {
    try {
      const data = await departamentosRepository.getAll();
      dispatch(onListDeptos(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  const startLoadingDeptoById = async (id: ID): Promise<void> => {
    try {
      const data = await departamentosRepository.getById(id);
      dispatch(onGetDeptoById(data));
      
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    deptos,
    startLoadingDeptos,
    startLoadingDeptoById,
    isLoadingDeptos,
  };
};