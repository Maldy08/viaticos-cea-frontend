export const importePorDias = (dias:number, nivelEmpleado:number,fueraDelEstado: boolean ): number => {
    
   //modificar el importe de viatico por nivel de empleado
   // 04/04/2024
    const importeViaticoDentroEstadoNivel1 = 270;
    const importeViaticoDentroEstadoNivel2 = 300;
    const importeViaticoDentroEstadoNivel1Titular = 350

    const importeViaticoFueraEstadoNivel1 = 400;
    const importeViaticoFueraEstadoNivel2 = 500;
    const importeViaticoFueraEstadoNivel2Titular = 600;

    let importeViatico: number;
    if( fueraDelEstado ) {
       importeViatico = nivelEmpleado < 17 ? importeViaticoFueraEstadoNivel1 * dias : nivelEmpleado >= 17 && nivelEmpleado <= 19 ? importeViaticoFueraEstadoNivel2 * dias : importeViaticoFueraEstadoNivel2Titular * dias;
    } else {
       importeViatico = nivelEmpleado < 17 ? importeViaticoDentroEstadoNivel1 * dias : nivelEmpleado >= 17 && nivelEmpleado <= 19 ? importeViaticoDentroEstadoNivel2 * dias : importeViaticoDentroEstadoNivel1Titular * dias;
    }

    return importeViatico;
}