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

            const { data } = await viaticosApi.get(`api/Empleados/GetEmpleadosByDeptoComi/${ depto }`);
            dispatch( onListEmpleadosByDepto( data.data ));

        } catch (error) {
            throw new Error("Error en obtener el listado de empleados.");
        }

    }

    const startLoadingEmpleadosByDeptoppto = async( deptoppto:number ) => {

        try {
            const { data } = await viaticosApi.get(`api/Empleados/GetEmpleadosByDeptoPpto/${ deptoppto }`);
            dispatch( onListEmpleadosByDeptoppto( data.data ));
            
        } catch (error) {
            throw new Error("Error en obtener el listado de empleados.");
        }
    }

    const startLoadingEmpleadoById = async( idempleado:number ) => {
        try {
            const { data } = await viaticosApi.get(`api/Empleados/GetEmpleadoById/${ idempleado }`);
            console.log({data})
            dispatch(onGetEmpleadoById( data.data ));
            
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