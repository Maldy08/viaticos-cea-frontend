import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onCloseEmpleadosModal, onModificarViatico, onOpenEmpleadosModal, onSelectEmpleado, onSelectModificarViatico } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const { isEmpleadosModalOpen, empleadoModalSelected, isModificarViatico, ViaticoModificar } = useSelector( ( state: RootState ) => state.ui );
    const dispatch = useDispatch();

    const openEmpleadosModal = () => {
        dispatch( onOpenEmpleadosModal( ) );
    }

    const closeEmpleadosModal = () => {
        dispatch( onCloseEmpleadosModal( ) );
    }

    const selectEmpleadoModal = ( empleado: number ) => {
        dispatch( onSelectEmpleado( empleado ) );
    }

    const modificarViatico = () => {
        dispatch( onModificarViatico());
    }

    const setModificarViatico = (oficina:number, ejercicio:number, noViat:number) => {
        dispatch(onSelectModificarViatico({ oficina, ejercicio, noViat}));
    }

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

    }
}