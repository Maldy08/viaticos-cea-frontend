import { createSlice } from "@reduxjs/toolkit";
import { Deptos } from '../../interfaces/interfaces';

const deptos = {} as Deptos[];
const depto = {} as Deptos;

export const deptosSlice = createSlice({
    name:'deptos',
    initialState: {
        isLoadingDeptos:true, 
        deptos: deptos ,
        depto: depto

    },
    reducers:{
        onListDeptos: ( state, { payload = [] } ) => {
            state.isLoadingDeptos  = false;
            state.deptos = payload;
        },
        onGetDeptoById: ( state, { payload } ) => {
            state.isLoadingDeptos = false;
            state.depto = payload;
        }
    }
});

export const { onListDeptos, onGetDeptoById } = deptosSlice.actions;