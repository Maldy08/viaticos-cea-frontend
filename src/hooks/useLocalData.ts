

export const useLocalData = () => {

    const localData = JSON.parse( localStorage.getItem('data') || '{ }');
    const userData = localData?.userData ?? {};

    const activo = userData?.activo ?? userData?.Activo;
    const depto = userData?.depto ?? userData?.Depto;
    const deptoDescripcion = userData?.deptoDescripcion ?? userData?.DeptoDescripcion;
    const descripcionPuesto = userData?.descripcionPuesto ?? userData?.DescripcionPuesto;
    const idPuesto = userData?.idPue ?? userData?.IdPue ?? userData?.IdPuesto;
    const noEmpleado = userData?.noEmpleado ?? userData?.NoEmpleado;
    const nombreCompleto =  userData?.nombreCompleto ?? userData?.NombreCompleto;
    const isActivoViaticos = userData?.viaticos ?? userData?.Viaticos;
    const viaticosNivel = userData?.viaticosNivel ?? userData?.ViaticosNivel;
    const municipio = userData?.municipio ?? userData?.Municipio;
    const oficina = userData?.oficina ?? userData?.Oficina;



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
        municipio,
        oficina,

    }
}