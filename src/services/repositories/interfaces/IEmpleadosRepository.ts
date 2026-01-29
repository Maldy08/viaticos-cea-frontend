import type { Empleado, VistaEmpleado } from '../../../types/empleados/empleado.types';
import type { ID } from '../../../types/common/base.types';
import type { IReadOnlyRepository } from './IBaseRepository';

/**
 * Contrato para el repositorio de empleados
 */
export interface IEmpleadosRepository extends Partial<IReadOnlyRepository<Empleado, ID>> {
  getByDepto(depto: ID): Promise<Empleado[]>;
  getByDeptoPpto(deptoPpto: ID): Promise<Empleado[]>;
  getVistaEmpleadoById(id: ID): Promise<VistaEmpleado>;
}