import { createSlice } from "@reduxjs/toolkit";
import { ListViaticos, Viaticos } from '../../interfaces/interfaces';

const listViaticos = { } as ListViaticos[]
const viatico = { } as Viaticos

export const viaticosSlice = createSlice({
    name: 'viaticos',
    initialState: {
        isLoading:true,
        listviaticos: [],
        viatico: {} ,
        errorMessage: undefined
    },
    reducers: {
        onListViaticosByEmpleado:( state, { payload = [] } ) => {
            state.isLoading = false;
            state.listviaticos = payload;
        },
        onError: ( state, { payload } ) => {
            state.errorMessage = payload ;
        } 
    }
    
});

export const { onListViaticosByEmpleado, onError } = viaticosSlice.actions;