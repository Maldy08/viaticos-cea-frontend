import type { ApiResponse } from '../../../types/common/base.types';


export interface IBaseRepository<T, ID = number> {
    getAll(): Promise<T[]>;
    getById(id : ID): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: ID, data: Partial<T>): Promise<T>;
    delete(id: ID) : Promise<void>;

}

/**
 * Interfaz para repositorios de solo lectura
 */
export interface IReadOnlyRepository<T, ID = number> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T>;
}