import { viaticosApi } from '../../api/viaticosApi';
import { HttpClient } from './HttpClient';

/**
 * Instancia del cliente HTTP configurado con la API de viáticos
 */
export const apiClient = new HttpClient(viaticosApi);