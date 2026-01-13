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
        onResetUiState: ( state ) => {
            state.isEmpleadosModalOpen = false;
            state.empleadoModalSelected = 0;
            state.isModificarViatico = false;
            state.ViaticoModificar = { oficina: 0, ejercicio: 0, noViat: 0 };
        },
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
    onResetUiState,
    onOpenEmpleadosModal, 
    onCloseEmpleadosModal, 
    onSelectEmpleado,
    onModificarViatico, 
    onSelectModificarViatico,
    
} = uiSlice.actions;