import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/store/store.types";
import {
  onAddNewViatico, 
  onGetConsecutivo, 
  onGetFormatoComision, 
  onGetViaticoEjercicioOficinaNoviat, 
  onListViaticosByEmpleado, 
  onResetData, 
  onUpdateViatico,
} from "../store/viaticos/viaticosSlice";
import type { Viatico } from "../types/viaticos/viatico.types";
import type { ID } from "../types/common/base.types";
import { viaticosRepository } from '../services/repositories';

export const useViaticosStore = () => {
  const { 
    isLoading, 
    listviaticos, 
    viatico, 
    errorMessage, 
    consecutivo, 
    formatoComision 
  } = useSelector((state: RootState) => state.viaticos);
  const dispatch = useDispatch();

  const startLoadingViaticosByEmpleado = async (
    ejercicio: number, 
    empleado: ID
  ): Promise<void> => {
    try {
      const data = await viaticosRepository.getByEmpleadoEjercicio(ejercicio, empleado);
      dispatch(onListViaticosByEmpleado(data));
      
    } catch (error: any) {
      console.log({ error });
      throw new Error("Error al obtener el listado de viaticos por empleado.");
    }
  };

  const startGetConsecutivo = async (
    ejercicio: number, 
    oficina: ID
  ): Promise<number> => {
    try {
      const data = await viaticosRepository.getConsecutivo(ejercicio, oficina);
      dispatch(onGetConsecutivo(data));
      return data.consecutivo;
      
    } catch (error: any) {
      console.log({ error });
      throw new Error("Error al obtener el numero de consecutivo.");
    }
  };

  const startAddNewViatico = async (viaticoData: Viatico): Promise<void> => {
    try {
      const data = await viaticosRepository.create(viaticoData);
      dispatch(onAddNewViatico(data));
      
    } catch (error) {
      console.log(error);
      throw new Error("Error al agregar Viatico");
    }
  };

  const startGetFormatoComision = async (
    oficina: ID, 
    ejercicio: number, 
    noviat: number
  ): Promise<void> => {
    try {
      const data = await viaticosRepository.getFormatoComision(oficina, ejercicio, noviat);
      dispatch(onGetFormatoComision(data));
      
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener formato de comisión");
    }
  };

  const startGetViaticoByEjercicioOficinaNoviat = async (
    oficina: ID, 
    ejercicio: number, 
    noviat: number
  ): Promise<void> => {
    try {
      const data = await viaticosRepository.getByOficinaEjercicioNoviat(oficina, ejercicio, noviat);
      dispatch(onGetViaticoEjercicioOficinaNoviat(data));
      
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener viático");
    }
  };

  const startUpdateViatico = async (viatico: Viatico): Promise<void> => {
    try {
      const data = await viaticosRepository.update(viatico);
      dispatch(onUpdateViatico(data));

    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar viático");
    }
  };

  const startResetData = (): void => {
    dispatch(onResetData());
  };

  return {
    isLoading,
    consecutivo,
    viatico,
    listviaticos,
    formatoComision,
    errorMessage,
    startLoadingViaticosByEmpleado,
    startGetConsecutivo,
    startAddNewViatico,
    startGetFormatoComision,
    startGetViaticoByEjercicioOficinaNoviat,
    startUpdateViatico,
    startResetData,
  };
};