import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/interfaces";

interface initialStateProps {
    status:string;
    user: { },
    errorMessage:any;
}

interface UserLogin {
    ok:boolean,
    Token:string,
    Id:string,
    User:string,
    UserData:UserData
    

}

interface UserData {
    Activo:boolean,
    Depto:number,
    NoEmpleado:number,
    Viaticos:boolean,
    ViaticosNivel:number,
    DeptoDescripcion:string,
    NombreCompleto:string,
    IdPue:number,
    DescripcionPuesto:string,
    Municipio:number,
    Oficina:number
}

const user = {} as UserLogin;

//const initialState = { status: 'checking', user: {}, errorMessage : undefined }; 

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status:'checking',
        user:user,
        errorMessage:''
    },
    reducers: {
        onCheking: ( state ) => {
            state.status = 'checking';
            state.user = user ;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload
        },
        onLogout: ( state , { payload }) => {
            state.status = 'not-authenticated';
            state.user = user;
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
            state.user = user;
        },
        onAuthError: ( state ) => {
            state.status = 'El usuario y/o password son incorrectos'
        }
    }
});

export const { 
    onCheking, 
    onLogin, 
    onLogout, 
    clearErrorMessage, 
    onCheckUserById, 
    onError, 
    onAuthError,

} = authSlice.actions;