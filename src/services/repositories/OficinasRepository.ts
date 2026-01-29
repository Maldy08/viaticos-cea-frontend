import type { IOficinasRepository } from './interfaces/ICatalogosRepository';
import type { Oficina } from '../../types/catalogos/oficina.types';
import type { ID, ApiResponse } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de oficinas
 */
export class OficinasRepository implements IOficinasRepository {
  async getAll(): Promise<Oficina[]> {
    const response = await apiClient.get<ApiResponse<Oficina[]>>('api/Oficinas');
    return apiClient.extractData(response);
  }

  async getById(id: ID): Promise<Oficina> {
    const response = await apiClient.get<ApiResponse<Oficina>>(
      `api/Oficinas/${id}`
    );
    return apiClient.extractData(response);
  }
}

// Instancia singleton
export const oficinasRepository = new OficinasRepository();