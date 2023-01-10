import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/interfaces";

interface initialStateProps {
    status:string;
    user: User,
    errorMessage:any;
}

const user = {} as User;

const initialState = { status: 'cheking', user: {}, errorMessage : undefined }; 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onCheking: ( state ) => {
            state.status = 'cheking';
            state.user = user;
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload
            state.errorMessage = undefined;
        },
        onLogout: ( state , { payload }) => {
            state.status = 'not-authenticated';
            state.user = user;
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onCheking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;