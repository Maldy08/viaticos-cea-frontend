import { AuthStatus, ID } from '../common/base.types';
import { UserData } from './user.types';

/**
 * Tipos relacionados con autenticación
 */

// Credenciales de login
export interface LoginCredentials {
  login: string;
  password: string;
  ejercicio: number;
}

// Respuesta de login
export interface LoginResponse {
  ok: boolean;
  token: string;
  id: ID;
  user: string;
  userData: UserData;
}

// Estado de autenticación en Redux
export interface AuthState {
  status: AuthStatus | string;
  user: LoginResponse | Record<string, never>;
  errorMessage: string;
}

// Payload para actualizar contraseña
export interface UpdatePasswordPayload {
  userId: ID;
  newPassword: string;
}

// Token de validación
export interface TokenValidationResponse {
  token: string;
  ok: boolean;
  id: ID;
  user: string;
  userData: UserData;
}