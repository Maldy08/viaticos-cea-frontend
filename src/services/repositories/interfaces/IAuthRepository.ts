import type { LoginCredentials, LoginResponse, TokenValidationResponse } from '../../../types/auth/auth.types';
import type { ID } from '../../../types/common/base.types';

/**
 * Contrato para el repositorio de autenticación
 */
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  validateToken(token: string): Promise<TokenValidationResponse>;
  getUserById(id: ID): Promise<TokenValidationResponse>;
  changePassword(userId: string, newPassword: string): Promise<any>;
}