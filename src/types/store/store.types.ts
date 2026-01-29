import type { AuthState } from '../auth/auth.types';
import type { EmpleadosState } from '../empleados/empleados-state.types';
import type { DepartamentosState } from '../catalogos/departamento.types';
import type { OficinasState } from '../catalogos/oficina.types';
import type { CiudadesState } from '../catalogos/ciudad.types';
import type { EstadosState } from '../catalogos/estado.types';
import type { PaisesState } from '../catalogos/pais.types';
import type { UiState } from '../ui/ui.types';

// Importar desde los slices actualizados
import type { ViaticosState } from '../../store/viaticos/viaticosSlice';
import type { PartidasState } from '../../store/partidas/partidasSlice';

/**
 * Tipos relacionados con el store de Redux
 */

// Root State completo
export interface RootState {
  auth: AuthState;
  deptos: DepartamentosState;
  viaticos: ViaticosState;
  empleados: EmpleadosState;
  oficinas: OficinasState;
  ciudades: CiudadesState;
  ui: UiState;
  estados: EstadosState;
  partidas: PartidasState;
  paises: PaisesState;
}