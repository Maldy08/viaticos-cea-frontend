/**
 * Punto de entrada central para todos los tipos de la aplicación
 * Organizado por dominio para facilitar las importaciones
 */

// Tipos comunes
export * from './common';

// Autenticación
export * from './auth';

// Empleados
export * from './empleados';

// Viáticos
export * from './viaticos';

// Catálogos
export * from './catalogos';

// UI
export * from './ui';

// Store
export * from './store';

// Re-exportaciones para compatibilidad con código legacy
// TODO: Remover estas exportaciones cuando se complete la migración
export type {
  User,
  Deptos,
  Viaticos,
  ViaticosPart,
  ListViaticos,
  Empleado,
  VistaEmpledo,
  Oficina,
  Ciudades,
  Estados,
  Paises,
  ViaticoConsecutivo,
  FormatoComisionReporte,
} from './legacy';