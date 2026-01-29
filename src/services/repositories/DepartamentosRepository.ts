import type { IDepartamentosRepository } from './interfaces/ICatalogosRepository';
import type { Departamento } from '../../types/catalogos/departamento.types';
import type { ID } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de departamentos
 */
export class DepartamentosRepository implements IDepartamentosRepository {
  async getAll(): Promise<Departamento[]> {
    return apiClient.get<Departamento[]>('/api/Departamentos');
  }

  async getById(id: ID): Promise<Departamento> {
    return apiClient.get<Departamento>(
      `api/Departamentos/GetDeptoById/${id}`
    );
  }
}

// Instancia singleton
export const departamentosRepository = new DepartamentosRepository();