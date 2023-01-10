import { createSlice } from "@reduxjs/toolkit";

export const deptosSlice = createSlice({
    name:'deptos',
    initialState: {
        isLoadingDeptos:true, 
        deptos: [] ,
    },
    reducers:{
        onListDeptos: ( state, { payload = [] } ) => {
            state.isLoadingDeptos  = false;
            state.deptos = payload;
        }
    }
});

export const { onListDeptos } = deptosSlice.actions;