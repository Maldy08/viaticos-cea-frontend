import { createSlice } from "@reduxjs/toolkit";
import { Oficina } from "../../interfaces/interfaces";

const oficinas = {} as Oficina[];
const oficina = {} as Oficina;

export const oficinasSlice = createSlice({
    name:'oficinas',
    initialState: {
        isLoading:true,
        oficinas:oficinas,
        oficina:oficina,
        errorMessage: undefined
    },
    reducers: {
        onListOficinas: ( state, { payload = [] }) => {
            state.isLoading = false;
            state.oficinas = payload;
        }
    }

});

export const { onListOficinas } = oficinasSlice.actions;