import { createSlice } from '@reduxjs/toolkit';
import { Empleado } from '../../interfaces/interfaces';

const empleado = {} as Empleado;
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
        onError: ( state ) => {
            state.isLoading = false;
            state.errorMessage = "Error";
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = '';
        },

    }
});

export const { onListEmpleadosByDepto, onListEmpleadosByDeptoppto, onError, clearErrorMessage } = empleadosSlice.actions;