import { createSlice } from "@reduxjs/toolkit";
import { ViaticosPart } from "../../interfaces/interfaces";

const partidas = { } as ViaticosPart

export const partidasSlice = createSlice({
    name:'partidas',
    initialState:{
        isLoading:true,
        partidas:partidas

    },
    reducers:{
        onAddNew:( state, { payload } ) => {
            state.isLoading = false;
            state.partidas = payload;
           // console.log(payload);
           
        },
    }
})

export const { onAddNew } = partidasSlice.actions;