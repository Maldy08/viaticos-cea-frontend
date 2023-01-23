import { createSlice } from '@reduxjs/toolkit';
import { Estados } from '../../interfaces/interfaces';

const estados = [] as Estados[];
const estado = {} as Estados;

export const estadosSlice = createSlice({
    name:'estados',
    initialState: {
        isLoading: true,
        estados:estados,
        estado:estado
    },
    reducers:{
        onGetEstados: ( state, { payload = [] }) => {
            state.isLoading = false;
            state.estados = payload;
        },
        onGetEstadoById: ( state , { payload } ) => {
            state.isLoading = false;
            state.estado = payload;
        }

    }

});

export const { onGetEstados, onGetEstadoById } = estadosSlice.actions;