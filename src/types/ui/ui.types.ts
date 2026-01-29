import { ID } from '../common/base.types';

/**
 * Tipos relacionados con el estado de la UI
 */

// Datos del viático a modificar
export interface ViaticoModificar {
  oficina: ID;
  ejercicio: number;
  noViat: number;
}

// Estado de UI en Redux
export interface UiState {
  isEmpleadosModalOpen: boolean;
  empleadoModalSelected: ID;
  isModificarViatico: boolean;
  ViaticoModificar: ViaticoModificar;
}

// Versión mejorada con nombres más descriptivos
export interface UiStateV2 {
  modals: {
    empleados: {
      isOpen: boolean;
      selectedEmpleadoId: ID | null;
    };
  };
  viatico: {
    isEditMode: boolean;
    editingViatico: ViaticoModificar | null;
  };
}

// Tipos para modales
export interface ModalState {
  isOpen: boolean;
}

export interface EmpleadosModalState extends ModalState {
  selectedEmpleadoId: ID | null;
  searchTerm?: string;
}