import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../types/store/store.types';
import { onGetEstadoById, onGetEstados } from '../store/estados/estadosSlice';
import type { ID } from '../types/common/base.types';
import { estadosRepository } from '../services/repositories';

export const useEstadosStore = () => {
  const { estados, isLoading } = useSelector((state: RootState) => state.estados);
  const dispatch = useDispatch();

  const startLoadingEstados = async (): Promise<void> => {
    try {
      const data = await estadosRepository.getAll();
      dispatch(onGetEstados(data));
      
    } catch (error) {
      throw new Error("Error al cargar el listado de estados.");
    }
  };

  const startLoadingEstadoById = async (id: ID): Promise<void> => {
    try {
      const data = await estadosRepository.getById(id);
      dispatch(onGetEstadoById(data));
      
    } catch (error) {
      throw new Error("Error al cargar el estado.");
    }
  };

  return {
    estados,
    isLoading,
    startLoadingEstados,
    startLoadingEstadoById,
  };
};