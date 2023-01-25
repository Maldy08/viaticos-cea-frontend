import { createSlice } from "@reduxjs/toolkit";
import { ListViaticos, Viaticos, ViaticosConsecutivo } from '../../interfaces/interfaces';

const listViaticos = { } as ListViaticos[]
const viatico = { } as Viaticos
const consecutivo = {} as ViaticosConsecutivo

export const viaticosSlice = createSlice({
    name: 'viaticos',
    initialState: {
        isLoading:true,
        listviaticos: [ ],
        viatico: viatico ,
        errorMessage: undefined,
        consecutivo:consecutivo
    },
    reducers: {
        onListViaticosByEmpleado:( state, { payload = [] } ) => {
            state.isLoading = false;
            state.listviaticos = payload;
        },
        onError: ( state, { payload } ) => {
            state.errorMessage = payload ;
        },
        onGetConsecutivo: ( state, { payload }) => {
            state.isLoading = false;
            state.consecutivo = payload;
        },
        onAddNewViatico: ( state, { payload }) => {
            console.log( payload );
            state.isLoading = false;
            state.viatico = payload;
            
        }
    }
    
});

export const { onListViaticosByEmpleado, onGetConsecutivo ,onError, onAddNewViatico } = viaticosSlice.actions;