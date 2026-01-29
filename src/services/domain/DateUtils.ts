/**
 * Utilidades para manejo de fechas
 */
export class DateUtils {
  /**
   * Obtiene el nombre del mes en español
   */
  static obtenerNombreMes(fecha: Date): string {
    const meses = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    return meses[fecha.getMonth()];
  }

  /**
   * Calcula días entre dos fechas (inclusivo)
   */
  static calcularDias(fechaInicio: Date, fechaFin: Date): number {
    const unDia = 1000 * 60 * 60 * 24;
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    return Math.round(diferencia / unDia) + 1;
  }

  /**
   * Valida que una fecha esté dentro de un ejercicio
   */
  static validarFechaEnEjercicio(fecha: Date, ejercicio: number): boolean {
    return fecha.getFullYear() === ejercicio;
  }

  /**
   * Valida que fecha de inicio sea anterior o igual a fecha fin
   */
  static validarRangoFechas(fechaInicio: Date, fechaFin: Date): boolean {
    return fechaInicio <= fechaFin;
  }

  /**
   * Formatea fecha a DD/MM/YYYY
   */
  static formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

  /**
   * Formatea fecha a formato legible: "1 DE ENERO DE 2024"
   */
  static formatearFechaLegible(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = this.obtenerNombreMes(fecha);
    const año = fecha.getFullYear();
    return `${dia} DE ${mes} DE ${año}`;
  }

  /**
   * Obtiene el primer día del ejercicio
   */
  static obtenerInicioEjercicio(ejercicio: number): Date {
    return new Date(ejercicio, 0, 1);
  }

  /**
   * Obtiene el último día del ejercicio
   */
  static obtenerFinEjercicio(ejercicio: number): Date {
    return new Date(ejercicio, 11, 31);
  }
}