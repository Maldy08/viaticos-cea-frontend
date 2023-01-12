import { createSlice } from "@reduxjs/toolkit";


export const viaticosSlice = createSlice({
    name: 'viaticos',
    initialState: {
        isLoading:true,
        viaticos:[],
        viatico: {},
        errorMessage: undefined
    },
    reducers: {
        onListViaticosByEmpleado:( state, { payload = [] } ) => {
            state.isLoading = false;
            state.viaticos = payload;
        },
        onError: ( state, { payload } ) => {
            state.errorMessage = payload ;
        } 
    }
    
});

export const { onListViaticosByEmpleado, onError } = viaticosSlice.actions;