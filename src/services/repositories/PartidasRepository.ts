import type { IPartidasRepository } from './interfaces/IPartidasRepository';
import type { ViaticoPartida } from '../../types/viaticos/partida.types';
import { apiClient } from '../api/apiClient';

/**
 * Implementación del repositorio de partidas
 */
export class PartidasRepository implements IPartidasRepository {
  async create(partida: ViaticoPartida): Promise<ViaticoPartida> {
    return apiClient.post<ViaticoPartida, ViaticoPartida>(
      'api/Viatico/ViaticosPart',
      partida
    );
  }

  async update(partida: ViaticoPartida): Promise<ViaticoPartida> {
    return apiClient.put<ViaticoPartida, ViaticoPartida>(
      'api/Viatico/ViaticosPart',
      partida
    );
  }
}

// Instancia singleton
export const partidasRepository = new PartidasRepository();