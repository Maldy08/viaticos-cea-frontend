import type { IPaisesRepository } from './interfaces/ICatalogosRepository';
import type { Pais } from '../../types/catalogos/pais.types';
import type { ID, ApiResponse } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de países
 */
export class PaisesRepository implements IPaisesRepository {
  async getAll(): Promise<Pais[]> {
    const response = await apiClient.get<ApiResponse<Pais[]>>('api/Paises');
    return apiClient.extractData(response);
  }

  async getById(id: ID): Promise<Pais> {
    const response = await apiClient.get<ApiResponse<Pais>>(
      `api/Paises/${id}`
    );
    return apiClient.extractData(response);
  }
}

// Instancia singleton
export const paisesRepository = new PaisesRepository();