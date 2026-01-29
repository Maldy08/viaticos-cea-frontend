import type { IEstadosRepository } from './interfaces/ICatalogosRepository';
import type { Estado } from '../../types/catalogos/estado.types';
import type { ID } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de estados
 */
export class EstadosRepository implements IEstadosRepository {
  async getAll(): Promise<Estado[]> {
    return apiClient.get<Estado[]>('api/Estados');
  }

  async getById(id: ID): Promise<Estado> {
    return apiClient.get<Estado>(
      `api/Estados/ByIdEstado/${id}`
    );
  }
}

// Instancia singleton
export const estadosRepository = new EstadosRepository();