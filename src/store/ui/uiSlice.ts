import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isEmpleadosModalOpen: false,
        empleadoModalSelected:0
    },
    reducers: {
        onOpenEmpleadosModal: ( state ) => {
            state.isEmpleadosModalOpen = true ;
            
        },
        onCloseEmpleadosModal: ( state, { payload } ) => {
            state.isEmpleadosModalOpen = false;
            state.empleadoModalSelected = payload;
        }
        
    }
});

export const { onOpenEmpleadosModal, onCloseEmpleadosModal } = uiSlice.actions;