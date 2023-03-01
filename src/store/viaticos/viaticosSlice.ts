import { createSlice } from "@reduxjs/toolkit";
import { FormatoComisionReporte, ListViaticos, Viaticos, ViaticosConsecutivo } from '../../interfaces/interfaces';

const listViaticos = { } as ListViaticos[]
const viatico = {} as Viaticos 
const consecutivo = {} as ViaticosConsecutivo
const formatoComision = {} as FormatoComisionReporte;

export const viaticosSlice = createSlice({
    name: 'viaticos',
    initialState: {
        isLoading:true,
        listviaticos: [ ],
        viatico: viatico ,
        errorMessage: undefined,
        consecutivo:consecutivo,
        formatoComision:formatoComision
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
            state.isLoading = false;
            state.viatico = payload;

            //console.log(payload);
            //state.viatico = payload;
            
        },
        onGetFormatoComision: ( state, { payload }) => {
            state.isLoading = false;
            state.formatoComision = payload;
        },
        onGetViaticoEjercicioOficinaNoviat: (state, { payload }) => {
            state.isLoading = false;
            state.viatico = payload;
        },

        onUpdateViatico: (state, { payload }) => {
            state.isLoading = false;
            state.viatico = payload;
        },
    }
    
});

export const { 
    onListViaticosByEmpleado, 
    onGetConsecutivo,
    onError, 
    onAddNewViatico, 
    onGetFormatoComision, 
    onGetViaticoEjercicioOficinaNoviat,
    onUpdateViatico,
    
} = viaticosSlice.actions;