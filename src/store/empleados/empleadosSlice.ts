import { createSlice } from '@reduxjs/toolkit';


export const empleadosSlice = createSlice({
    name: 'empleados',
    initialState: {
        isLoading: true,
        empleados: [ ],
        empleado: { },
        errorMessage: ''
    },
    reducers: {
        onListEmpleadosByDepto: ( state, { payload = [] } ) => {
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

export const { onListEmpleadosByDepto, onError, clearErrorMessage } = empleadosSlice.actions;