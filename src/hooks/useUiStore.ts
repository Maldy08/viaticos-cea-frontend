import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onCloseEmpleadosModal, onModificarViatico, onOpenEmpleadosModal, onSelectEmpleado } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const { isEmpleadosModalOpen, empleadoModalSelected } = useSelector( ( state: RootState ) => state.ui );
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
        dispatch( onModificarViatico() );
    }

    return {
        isEmpleadosModalOpen,
        empleadoModalSelected,
        openEmpleadosModal,
        closeEmpleadosModal,
        selectEmpleadoModal,
        modificarViatico,

    }
}