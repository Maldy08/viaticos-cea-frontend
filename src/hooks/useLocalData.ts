

export const useLocalData = () => {

    const localData = JSON.parse( localStorage.getItem('data') || '{ }');

    const activo = localData.userData.activo;
    const depto = localData.userData.depto;
    const deptoDescripcion = localData.userData.deptoDescripcion;
    const descripcionPuesto = localData.userData.descripcionPuesto;
    const idPuesto = localData.userData.idPue;
    const noEmpleado = localData.userData.noEmpleado;
    const nombreCompleto =  localData.userData.nombreCompleto;
    const isActivoViaticos = localData.userData.viaticos;
    const viaticosNivel = localData.userData.viaticosNivel;



    return {

        activo,
        depto,
        deptoDescripcion,
        descripcionPuesto,
        idPuesto,
        noEmpleado,
        nombreCompleto,
        isActivoViaticos,
        viaticosNivel,
    

    }
}