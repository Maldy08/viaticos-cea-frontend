/**
 * Tipos legacy para compatibilidad con código antiguo
 * DEPRECATED: Usar los nuevos tipos segregados en su lugar
 */

import { User } from '../auth/user.types';
import { Departamento as Deptos } from '../catalogos/departamento.types';
import { Viatico as Viaticos } from '../viaticos/viatico.types';
import { ViaticoPartida as ViaticosPart } from '../viaticos/partida.types';
import { ViaticoListItem as ListViaticos } from '../viaticos/viatico.types';
import { Empleado, VistaEmpleado as VistaEmpledo } from '../empleados/empleado.types';
import { Oficina } from '../catalogos/oficina.types';
import { Ciudad as Ciudades } from '../catalogos/ciudad.types';
import { Estado as Estados } from '../catalogos/estado.types';
import { Pais as Paises } from '../catalogos/pais.types';
import { ViaticoConsecutivo } from '../viaticos/reporte.types';
import { FormatoComision as FormatoComisionReporte } from '../viaticos/reporte.types';


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
};