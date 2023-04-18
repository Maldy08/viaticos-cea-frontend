import { createSlice } from "@reduxjs/toolkit";
import { Ciudades, Oficina } from "../../interfaces/interfaces";

const ciudades = {} as Ciudades[];
const ciudad = {} as Ciudades;

export const ciudadesSlice = createSlice({
    name:'ciudades',
    initialState:{
        isLoading:true,
        ciudades:ciudades,
        ciudad: ciudad,
    },
    reducers:{
        onListCiudades: ( state, { payload = []}) => {
            state.isLoading = false;
            state.ciudades = payload;
        },
        onGetCiudadById: (state, { payload }) => {
            state.isLoading = false;
            state.ciudad = payload;
            
        }
    }
});

export const { onListCiudades, onGetCiudadById } = ciudadesSlice.actions;