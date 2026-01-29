import type { ViaticoPartida } from '../../../types/viaticos/partida.types';

/**
 * Contrato para el repositorio de partidas
 */
export interface IPartidasRepository {
  create(partida: ViaticoPartida): Promise<ViaticoPartida>;
  update(partida: ViaticoPartida): Promise<ViaticoPartida>;
}