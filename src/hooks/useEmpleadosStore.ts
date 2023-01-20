import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { Empleado } from "../interfaces/interfaces";
import { onError } from "../store/auth/authSlice";
import { onListEmpleadosByDepto, onListEmpleadosByDeptoppto } from "../store/empleados/empleadosSlice";
import { RootState } from "../store/store"


export const useEmpleadosStore = () => {

    const { empleados, isLoading } = useSelector( ( state: RootState ) => state.empleados );
    const dispatch = useDispatch();

    interface EmpleadoResponse  {
        data: Empleado
    }
    type EmpleadoResponseArray = EmpleadoResponse[];

    const startLoadingEmpleadosByDepto = async( depto: number ) => {

        try {

            const { data } = await viaticosApi.get<EmpleadoResponseArray>(`/Empleados/byDeptocomi/${ depto }`);
            dispatch( onListEmpleadosByDepto( data ));

        } catch (error) {
            dispatch( onError( error ) )
        }

    }

    const startLoadingEmpleadosByDeptoppto = async( deptoppto: number ) => {

        try {
            const { data } = await viaticosApi.get<EmpleadoResponseArray>(`/Empleados/byDeptoppto/${ deptoppto }`);
            dispatch( onListEmpleadosByDeptoppto( data ));
            
        } catch (error) {
            dispatch( onError( error ) );
        }
    }

    return {
        empleados,
        isLoading,
        startLoadingEmpleadosByDepto,
        startLoadingEmpleadosByDeptoppto,
    }

}