import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/store/store.types";
import { 
  onCloseEmpleadosModal, 
  onModificarViatico, 
  onOpenEmpleadosModal, 
  onSelectEmpleado, 
  onSelectModificarViatico 
} from "../store/ui/uiSlice";
import type { ID } from "../types/common/base.types";

export const useUiStore = () => {
  const { 
    isEmpleadosModalOpen, 
    empleadoModalSelected, 
    isModificarViatico, 
    ViaticoModificar 
  } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const openEmpleadosModal = (): void => {
    dispatch(onOpenEmpleadosModal());
  };

  const closeEmpleadosModal = (): void => {
    dispatch(onCloseEmpleadosModal());
  };

  const selectEmpleadoModal = (empleado: ID): void => {
    dispatch(onSelectEmpleado(empleado));
  };

  const modificarViatico = (): void => {
    dispatch(onModificarViatico());
  };

  const setModificarViatico = (oficina: number, ejercicio: number, noViat: number): void => {
    dispatch(onSelectModificarViatico({ oficina, ejercicio, noViat }));
  };

  return {
    isEmpleadosModalOpen,
    empleadoModalSelected,
    openEmpleadosModal,
    closeEmpleadosModal,
    selectEmpleadoModal,
    modificarViatico,
    setModificarViatico,
    isModificarViatico,
    ViaticoModificar
  };
};