import { useDispatch, useSelector } from "react-redux";
import { onAddNew } from "../store/partidas/partidasSlice";
import type { RootState } from "../types/store/store.types";
import type { ViaticoPartida } from "../types/viaticos/partida.types";
import { partidasRepository } from '../services/repositories';

export const usePartidasStore = () => {
  const { isLoading, partidas } = useSelector((state: RootState) => state.partidas);
  const dispatch = useDispatch();

  const startAddNewPartidas = async (partidas: ViaticoPartida): Promise<void> => {
    try {
      const data = await partidasRepository.create(partidas);
      dispatch(onAddNew(data));

    } catch (error: any) {
      console.log(error);
      throw new Error('Error al guardar partidas de viaticos');
    }
  };

  const startUpdatePartidas = async (partidas: ViaticoPartida): Promise<void> => {
    try {
      const data = await partidasRepository.update(partidas);
      dispatch(onAddNew(data));

    } catch (error: any) {
      console.log(error);
      throw new Error('Error al actualizar partidas de viaticos');
    }
  };

  return {
    isLoading,
    partidas,
    startAddNewPartidas,
    startUpdatePartidas,
  };
};