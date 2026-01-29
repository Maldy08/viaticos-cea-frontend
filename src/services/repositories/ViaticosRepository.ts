import type { IViaticosRepository } from './interfaces/IViaticosRepository';
import type { Viatico, ViaticoListItem } from '../../types/viaticos/viatico.types';
import type { ViaticoConsecutivo, FormatoComision } from '../../types/viaticos/reporte.types';
import type { ID, ApiResponse } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de viáticos
 */
export class ViaticosRepository implements IViaticosRepository {
  async getByEmpleadoEjercicio(ejercicio: number, empleado: ID): Promise<ViaticoListItem[]> {
    const response = await apiClient.get<ApiResponse<ViaticoListItem[]>>(
      `api/Viatico/ListaViaticosPorEmpleado/${ejercicio}/${empleado}`
    );
    return apiClient.extractData(response);
  }

  async getConsecutivo(ejercicio: number, oficina: ID): Promise<ViaticoConsecutivo> {
    const response = await apiClient.get<ApiResponse<ViaticoConsecutivo>>(
      `api/Viatico/GetNoViat/${ejercicio}/${oficina}`
    );
    return apiClient.extractData(response);
  }

  async create(viatico: Viatico): Promise<Viatico> {
    return apiClient.post<Viatico, Viatico>('api/Viatico', viatico);
  }

  async update(viatico: Viatico): Promise<Viatico> {
    return apiClient.put<Viatico, Viatico>('api/Viatico', viatico);
  }

  async getFormatoComision(oficina: ID, ejercicio: number, noviat: number): Promise<FormatoComision> {
    const response = await apiClient.get<ApiResponse<FormatoComision>>(
      `api/Viatico/FormatoComision/${oficina}/${ejercicio}/${noviat}`
    );
    return apiClient.extractData(response);
  }

  async getByOficinaEjercicioNoviat(oficina: ID, ejercicio: number, noviat: number): Promise<Viatico> {
    const response = await apiClient.get<ApiResponse<Viatico>>(
      `api/Viatico/GetAllByEjercicioOficinaNoviat/${ejercicio}/${oficina}/${noviat}`
    );
    return apiClient.extractData(response);
  }
}

// Instancia singleton
export const viaticosRepository = new ViaticosRepository();