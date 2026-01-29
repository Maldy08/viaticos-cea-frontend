import { createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginResponse } from "../../types/auth/auth.types";


// Estado inicial vacío
const emptyUser = {} as LoginResponse;

// Estado inicial del slice
const initialState: AuthState = {
  status: 'checking',
  user: emptyUser,
  errorMessage: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCheking: (state) => {
      state.status = 'checking';
      state.user = emptyUser;
    },
    onLogin: (state, { payload }: { payload: { user: LoginResponse } }) => {
      state.status = 'authenticated';
      state.user = payload.user;
      state.errorMessage = '';
    },
    onLogout: (state, { payload }: { payload?: { user?: Record<string, never> } }) => {
      state.status = 'not-authenticated';
      state.user = emptyUser;
      state.errorMessage = '';
    },
    clearErrorMessage: (state) => {
      state.errorMessage = '';
    },
    onCheckUserById: (state, { payload }: { payload: { user: LoginResponse } }) => {
      state.status = 'checking';
      state.user = payload.user;
    },
    onError: (state, { payload }: { payload: string }) => {
      state.errorMessage = payload;
      state.user = emptyUser;
    },
    onAuthError: (state) => {
      state.status = 'not-authenticated';
      state.errorMessage = 'El usuario y/o password son incorrectos';
      state.user = emptyUser;
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