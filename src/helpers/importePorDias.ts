export const importPorDias = ( dias:number,fueraDelEstado: boolean, nivel:number ): number => {

    const importeViaticoDentroEstadoNivel1 = 230;
    const importeViaticoFueraEstadoNivel1 = 430;
    const importeViaticoDentroEstadoNivel2 = 260;
    const importeViaticoFueraEstadoNivel2 = 450;
    let importeViatico: number;

    if( fueraDelEstado ) {
        importeViatico = nivel < 17 ? importeViaticoFueraEstadoNivel1 * dias : importeViaticoFueraEstadoNivel2 * dias;
     } else {
        importeViatico = nivel < 17 ? importeViaticoDentroEstadoNivel1 * dias : importeViaticoDentroEstadoNivel2 * dias;
     }


     return importeViatico;
}