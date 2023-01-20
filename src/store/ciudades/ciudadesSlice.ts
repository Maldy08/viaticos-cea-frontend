import { createSlice } from "@reduxjs/toolkit";
import { Ciudades, Oficina } from "../../interfaces/interfaces";

const ciudades = {} as Ciudades[];

export const ciudadesSlice = createSlice({
    name:'ciudades',
    initialState:{
        isLoading:true,
        ciudades:ciudades
    },
    reducers:{
        onListCiudades: ( state, { payload = []}) => {
            state.isLoading = false;
            state.ciudades = payload;
        }
    }
});

export const { onListCiudades } = ciudadesSlice.actions;