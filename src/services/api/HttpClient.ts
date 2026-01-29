import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../../types/common/base.types';

/**
 * Cliente HTTP base para hacer peticiones a la API
 * Proporciona métodos tipados y manejo de errores centralizado
 */
export class HttpClient {
  constructor(private axiosInstance: AxiosInstance) {}
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: any): Error {
    if (error.response) {
      // Error de respuesta del servidor
      const message = error.response.data?.message || error.response.statusText;
      return new Error(`API Error: ${message}`);
    } else if (error.request) {
      // Error de red
      return new Error('Network Error: No response received from server');
    } else {
      // Otro tipo de error
      return new Error(`Error: ${error.message}`);
    }
  }

  /**
   * Extraer datos de ApiResponse wrapper
   */
  extractData<T>(response: ApiResponse<T>): T {
    return response.data;
  }
}