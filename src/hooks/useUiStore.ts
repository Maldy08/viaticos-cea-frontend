import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onCloseEmpleadosModal, onOpenEmpleadosModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const { isEmpleadosModalOpen, empleadoModalSelected } = useSelector( ( state: RootState ) => state.ui );
    const dispatch = useDispatch();

    const openEmpleadosModal = () => {
        dispatch( onOpenEmpleadosModal( ) );
    }

    const closeEmpleadosModal = () => {
        dispatch( onCloseEmpleadosModal( empleadoModalSelected ) );
    }

    return {

        isEmpleadosModalOpen,
        empleadoModalSelected,
        openEmpleadosModal,
        closeEmpleadosModal,

    }
}