import { createSlice } from "@reduxjs/toolkit";
import { Paises } from "../../interfaces/interfaces";

const paises = [] as Paises[];
const pais = {} as Paises;

export const paisesSlice = createSlice({
    name : 'paises',
    initialState:{
        isLoading:true,
        paises:paises,
        pais:pais,

    },
    reducers: {
        onListPaises:(state, { payload = []}) => {
            state.isLoading = false;
            state.paises = payload;
        },
    },
});

export const { onListPaises} = paisesSlice.actions;