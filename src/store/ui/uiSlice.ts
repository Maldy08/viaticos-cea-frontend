import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isEmpleadosModalOpen: false,
        empleadoModalSelected:0,
        isModificarViatico:false,
        ViaticoModificar:{
            oficina:0,
            ejercicio:0,
            noViat:0
        }
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
            //state.modificarViatico = payload;
        },
        onSelectModificarViatico:( state , {payload}) => {
            state.ViaticoModificar =  payload;
        }
        
    }
});

export const { 
    onOpenEmpleadosModal, 
    onCloseEmpleadosModal, 
    onSelectEmpleado,
    onModificarViatico, 
    onSelectModificarViatico,
    
} = uiSlice.actions;