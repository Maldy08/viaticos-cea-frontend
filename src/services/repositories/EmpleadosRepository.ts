import type { IEmpleadosRepository } from './interfaces/IEmpleadosRepository';
import type { Empleado, VistaEmpleado } from '../../types/empleados/empleado.types';
import type { ID, ApiResponse } from '../../types/common/base.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de empleados
 */
export class EmpleadosRepository implements IEmpleadosRepository {
  async getByDepto(depto: ID): Promise<Empleado[]> {
    const response = await apiClient.get<ApiResponse<Empleado[]>>(
      `api/Empleados/GetEmpleadosByDeptoComi/${depto}`
    );
    return apiClient.extractData(response);
  }

  async getByDeptoPpto(deptoPpto: ID): Promise<Empleado[]> {
    const response = await apiClient.get<ApiResponse<Empleado[]>>(
      `api/Empleados/GetEmpleadosByDeptoPpto/${deptoPpto}`
    );
    return apiClient.extractData(response);
  }

  async getVistaEmpleadoById(id: ID): Promise<VistaEmpleado> {
    const response = await apiClient.get<ApiResponse<VistaEmpleado>>(
      `api/Empleados/GetEmpleadoById/${id}`
    );
    return apiClient.extractData(response);
  }

  async getAll(): Promise<Empleado[]> {
    const response = await apiClient.get<ApiResponse<Empleado[]>>('api/Empleados');
    return apiClient.extractData(response);
  }

  async getById(id: ID): Promise<Empleado> {
    const response = await apiClient.get<ApiResponse<Empleado>>(
      `api/Empleados/${id}`
    );
    return apiClient.extractData(response);
  }
}

// Instancia singleton
export const empleadosRepository = new EmpleadosRepository();