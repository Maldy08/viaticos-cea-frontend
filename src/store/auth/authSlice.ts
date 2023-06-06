import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/interfaces";

interface initialStateProps {
    status:string;
    user: { },
    errorMessage:any;
}

//const user = {} as User;

//const initialState = { status: 'checking', user: {}, errorMessage : undefined }; 

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status:'checking',
        user:{ },
        errorMessage:''
    },
    reducers: {
        onCheking: ( state ) => {
            state.status = 'checking';
            state.user = { };
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload
        },
        onLogout: ( state , { payload }) => {
            state.status = 'not-authenticated';
            state.user = { };
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = '';
        },
        onCheckUserById: ( state, { payload }) => {
            state.status = 'checking';
            state.user = payload
          
        },
        onError: ( state, { payload }) => {
            state.errorMessage = payload;
            state.user = { };
        },
        onAuthError: ( state ) => {
            state.status = 'El usuario y/o password son incorrectos'
        }
    }
});

export const { onCheking, onLogin, onLogout, clearErrorMessage, onCheckUserById, onError, onAuthError } = authSlice.actions;