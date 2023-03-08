export const importePorDias = (dias:number, nivelEmpleado:number,fueraDelEstado: boolean ): number => {
    
    const importeViaticoDentroEstadoNivel1 = 230;
    const importeViaticoFueraEstadoNivel1 = 430;
    const importeViaticoDentroEstadoNivel2 = 260;
    const importeViaticoFueraEstadoNivel2 = 450;

    let importeViatico: number;
    if( fueraDelEstado ) {
       importeViatico = nivelEmpleado < 17 ? importeViaticoFueraEstadoNivel1 * dias : importeViaticoFueraEstadoNivel2 * dias;
    } else {
       importeViatico = nivelEmpleado < 17 ? importeViaticoDentroEstadoNivel1 * dias : importeViaticoDentroEstadoNivel2 * dias;
    }

    return importeViatico;
}