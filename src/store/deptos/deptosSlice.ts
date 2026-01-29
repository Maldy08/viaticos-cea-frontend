import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Departamento, DepartamentosState } from "../../types";

const departamentoVacio = {} as Departamento;
const departamentosVacios: Departamento[] = [];

const initialState: DepartamentosState = {
  isLoadingDeptos: true, 
  deptos: departamentosVacios,
  depto: departamentoVacio
};

export const deptosSlice = createSlice({
  name: 'deptos',
  initialState,
  reducers: {
    onListDeptos: (state, action: PayloadAction<Departamento[]>) => {
      state.isLoadingDeptos = false;
      state.deptos = action.payload;
    },
    onGetDeptoById: (state, action: PayloadAction<Departamento>) => {
      state.isLoadingDeptos = false;
      state.depto = action.payload;
    }
  }
});

export const { onListDeptos, onGetDeptoById } = deptosSlice.actions;