import { createSlice } from "@reduxjs/toolkit";
import { Deptos } from '../../interfaces/interfaces';

const deptos = {} as Deptos[];

export const deptosSlice = createSlice({
    name:'deptos',
    initialState: {
        isLoadingDeptos:true, 
        deptos: deptos ,
    },
    reducers:{
        onListDeptos: ( state, { payload = [] } ) => {
            state.isLoadingDeptos  = false;
            state.deptos = payload;
        }
    }
});

export const { onListDeptos } = deptosSlice.actions;