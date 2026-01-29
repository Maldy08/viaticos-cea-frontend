import type { IAuthRepository } from './interfaces/IAuthRepository';
import type { LoginCredentials, LoginResponse, TokenValidationResponse } from '../../types/auth/auth.types';
import type { ID } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de autenticación
 */
export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { login, password } = credentials;
    return apiClient.post<LoginResponse>(
      `api/Auth/login?user=${login}&password=${password}`
    );
  }

  async validateToken(token: string): Promise<TokenValidationResponse> {
    return apiClient.get<TokenValidationResponse>(
      `api/Auth/validate-token?token=${token}`
    );
  }

  async getUserById(id: ID): Promise<TokenValidationResponse> {
    return apiClient.get<TokenValidationResponse>(
      `api/Usuario/GetUserById?id=${id}`
    );
  }

  async changePassword(userId: string, newPassword: string): Promise<any> {
    return apiClient.put(
      `api/Auth/cambiopass?user=${userId}&newPassword=${newPassword}`
    );
  }
}

// Instancia singleton
export const authRepository = new AuthRepository();