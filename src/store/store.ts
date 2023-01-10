import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { deptosSlice } from "./deptos/deptosSlice";

 const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        deptos: deptosSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;