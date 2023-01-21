import { createSlice } from '@reduxjs/toolkit';
import { Empleado, VistaEmpledo } from '../../interfaces/interfaces';

const empleado = {} as VistaEmpledo;
const empleados = [] as Empleado[];

export const empleadosSlice = createSlice({
    name: 'empleados',
    initialState: {
        isLoading: true,
        empleados: empleados,
        empleado: empleado,
        errorMessage: ''
    },
    reducers: {
        onListEmpleadosByDepto: ( state, { payload = [] } ) => {
            state.isLoading = false;
            state.empleados = payload;
        },
        onListEmpleadosByDeptoppto: ( state, { payload = [] } ) => {
            state.isLoading = false;
            state.empleados = payload;
        },
        onGetEmpleadoById: ( state, { payload }) =>{
            state.isLoading = false;
            state.empleado = payload;
        },
        onError: ( state ) => {
            state.isLoading = false;
            state.errorMessage = "Error";
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = '';
        },

    }
});

export const { onListEmpleadosByDepto, onListEmpleadosByDeptoppto, onGetEmpleadoById, onError, clearErrorMessage } = empleadosSlice.actions;