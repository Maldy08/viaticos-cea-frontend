import type { ICiudadesRepository } from './interfaces/ICatalogosRepository';
import type { Ciudad } from '../../types/catalogos/ciudad.types';
import type { ID, ApiResponse } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de ciudades
 */
export class CiudadesRepository implements ICiudadesRepository {
  async getAll(): Promise<Ciudad[]> {
    const response = await apiClient.get<ApiResponse<Ciudad[]>>(
      'api/Viaticos/Ciudades'
    );
    return apiClient.extractData(response);
  }

  async getById(id: ID): Promise<Ciudad> {
    const response = await apiClient.get<ApiResponse<Ciudad>>(
      `api/Viaticos/Ciudades/${id}`
    );
    return apiClient.extractData(response);
  }
}

// Instancia singleton
export const ciudadesRepository = new CiudadesRepository();