//Identificadores
export type ID = number;

//Fechas
export type DateString = string; // Formato: 'YYYY-MM-DD'
export type ISODateString = string; // Formato: 'YYYY-MM-DDTHH:mm:ss.sssZ'


//Estados de carga
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

//Estado de autenticación
export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

//Respuesta genérica de API
export interface ApiResponse<T> {
  data: T;
  ok?: boolean;
  message?: string;
}

//Paginación
export interface PaginationParams {
  page: number; 
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

//Error handling
export interface ApiError {
    message: string;
    code?: number;
    details?: unknown;
}