import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { Empleado } from "../interfaces/interfaces";
import { onGetEmpleadoById, onListEmpleadosByDepto, onListEmpleadosByDeptoppto } from "../store/empleados/empleadosSlice";
import { RootState } from "../store/store"


export const useEmpleadosStore = () => {

    const { empleados, isLoading, empleado } = useSelector( ( state: RootState ) => state.empleados );
    const dispatch = useDispatch();

    interface EmpleadoResponse  {
        data: Empleado
    }
    type EmpleadoResponseArray = EmpleadoResponse[];

    const startLoadingEmpleadosByDepto = async( depto:number ) => {

        try {

            const { data } = await viaticosApi.get<EmpleadoResponseArray>(`/Empleados/byDeptocomi/${ depto }`);
            dispatch( onListEmpleadosByDepto( data ));

        } catch (error) {
            throw new Error("Error en obtener el listado de empleados.");
        }

    }

    const startLoadingEmpleadosByDeptoppto = async( deptoppto:number ) => {

        try {
            const { data } = await viaticosApi.get<EmpleadoResponseArray>(`/Empleados/byDeptoppto/${ deptoppto }`);
            dispatch( onListEmpleadosByDeptoppto( data ));
            
        } catch (error) {
            throw new Error("Error en obtener el listado de empleados.");
        }
    }

    const startLoadingEmpleadoById = async( idempleado:number ) => {
        try {
            const { data } = await viaticosApi.get<EmpleadoResponse>(`/VistaEmpleados/byId/${ idempleado }`);
            console.log({data})
            dispatch(onGetEmpleadoById( data ));
            
        } catch (error) {
            throw new Error("Error en obtener empleado por el id.");
        }
    }

    return {
        empleados,
        empleado,
        isLoading,
        startLoadingEmpleadosByDepto,
        startLoadingEmpleadosByDeptoppto,
        startLoadingEmpleadoById,
    }

}