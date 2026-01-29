import type { Viatico, ViaticoListItem } from '../../../types/viaticos/viatico.types';
import type { ViaticoConsecutivo, FormatoComision } from '../../../types/viaticos/reporte.types';
import type { ID } from '../../../types/common/base.types';

/**
 * Contrato para el repositorio de viáticos
 */
export interface IViaticosRepository {
  getByEmpleadoEjercicio(ejercicio: number, empleado: ID): Promise<ViaticoListItem[]>;
  getConsecutivo(ejercicio: number, oficina: ID): Promise<ViaticoConsecutivo>;
  create(viatico: Viatico): Promise<Viatico>;
  update(viatico: Viatico): Promise<Viatico>;
  getFormatoComision(oficina: ID, ejercicio: number, noviat: number): Promise<FormatoComision>;
  getByOficinaEjercicioNoviat(oficina: ID, ejercicio: number, noviat: number): Promise<Viatico>;
}