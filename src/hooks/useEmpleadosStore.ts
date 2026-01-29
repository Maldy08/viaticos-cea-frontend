import { useDispatch, useSelector } from "react-redux";
import { onGetEmpleadoById, onListEmpleadosByDepto, onListEmpleadosByDeptoppto } from "../store/empleados/empleadosSlice";
import type { RootState } from "../types/store/store.types";
import type { ID } from "../types/common/base.types";
import { empleadosRepository } from '../services/repositories';

export const useEmpleadosStore = () => {
  const { empleados, isLoading, empleado } = useSelector((state: RootState) => state.empleados);
  const dispatch = useDispatch();

  const startLoadingEmpleadosByDepto = async (depto: ID): Promise<void> => {
    try {
      const data = await empleadosRepository.getByDepto(depto);
      dispatch(onListEmpleadosByDepto(data));

    } catch (error) {
      throw new Error("Error en obtener el listado de empleados.");
    }
  };

  const startLoadingEmpleadosByDeptoppto = async (deptoppto: ID): Promise<void> => {
    try {
      const data = await empleadosRepository.getByDeptoPpto(deptoppto);
      dispatch(onListEmpleadosByDeptoppto(data));
      
    } catch (error) {
      throw new Error("Error en obtener el listado de empleados.");
    }
  };

  const startLoadingEmpleadoById = async (idempleado: ID): Promise<void> => {
    try {
      const data = await empleadosRepository.getVistaEmpleadoById(idempleado);
      console.log({ data });
      dispatch(onGetEmpleadoById(data));
      
    } catch (error) {
      throw new Error("Error en obtener empleado por el id.");
    }
  };

  return {
    empleados,
    empleado,
    isLoading,
    startLoadingEmpleadosByDepto,
    startLoadingEmpleadosByDeptoppto,
    startLoadingEmpleadoById,
  };
};