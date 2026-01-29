import type { Departamento } from '../../../types/catalogos/departamento.types';
import type { Oficina } from '../../../types/catalogos/oficina.types';
import type { Ciudad } from '../../../types/catalogos/ciudad.types';
import type { Estado } from '../../../types/catalogos/estado.types';
import type { Pais } from '../../../types/catalogos/pais.types';
import type { ID } from '../../../types/common/base.types';
import type { IReadOnlyRepository } from './IBaseRepository';

export interface IDepartamentosRepository extends IReadOnlyRepository<Departamento, ID> {}
export interface IOficinasRepository extends IReadOnlyRepository<Oficina, ID> {}
export interface ICiudadesRepository extends IReadOnlyRepository<Ciudad, ID> {}
export interface IEstadosRepository extends IReadOnlyRepository<Estado, ID> {}
export interface IPaisesRepository extends IReadOnlyRepository<Pais, ID> {}