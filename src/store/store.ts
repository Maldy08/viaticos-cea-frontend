import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { deptosSlice } from "./deptos/deptosSlice";
import { viaticosSlice } from "./viaticos/viaticosSlice";
import { empleadosSlice } from './empleados/empleadosSlice';
import { oficinasSlice } from "./oficinas/oficinasSlice";
import { ciudadesSlice } from "./ciudades/ciudadesSlice";
import { uiSlice } from "./ui/uiSlice";

 const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        deptos: deptosSlice.reducer,
        viaticos: viaticosSlice.reducer,
        empleados: empleadosSlice.reducer,
        oficinas: oficinasSlice.reducer,
        ciudades: ciudadesSlice.reducer,
        ui: uiSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;