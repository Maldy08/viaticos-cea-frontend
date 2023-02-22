import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isEmpleadosModalOpen: false,
        empleadoModalSelected:0,
        isModificarViatico:false,
    },
    reducers: {
        onOpenEmpleadosModal: ( state ) => {
            state.isEmpleadosModalOpen = true ;
        },
        onCloseEmpleadosModal: ( state ) => {
            state.isEmpleadosModalOpen = false;
        },
        onSelectEmpleado: ( state , { payload } ) => {
            state.empleadoModalSelected = payload;
        },
        onModificarViatico: ( state ) => {
            state.isModificarViatico = state.isModificarViatico? state.isModificarViatico = false : state.isModificarViatico = true;
        },
    }
});

export const { 
    onOpenEmpleadosModal, 
    onCloseEmpleadosModal, 
    onSelectEmpleado,
    onModificarViatico, 
} = uiSlice.actions;