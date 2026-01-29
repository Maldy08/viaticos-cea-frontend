import type { LocalUserData } from "../types/auth/user.types";
import type { ID } from "../types/common/base.types";

interface LocalStorageData {
  userData?: LocalUserData;
}

export const useLocalData = () => {
  const localData: LocalStorageData = JSON.parse(
    localStorage.getItem('data') || '{}'
  );
  const userData = localData?.userData ?? {};

  const activo: boolean = userData?.activo ?? userData?.Activo ?? false;
  const depto: ID = userData?.depto ?? userData?.Depto ?? 0;
  const deptoDescripcion: string = userData?.deptoDescripcion ?? userData?.DeptoDescripcion ?? '';
  const descripcionPuesto: string = userData?.descripcionPuesto ?? userData?.DescripcionPuesto ?? '';
  const idPuesto: ID = userData?.idPue ?? userData?.IdPue ?? userData?.IdPuesto ?? 0;
  const noEmpleado: ID = userData?.noEmpleado ?? userData?.NoEmpleado ?? 0;
  const nombreCompleto: string = userData?.nombreCompleto ?? userData?.NombreCompleto ?? '';
  const isActivoViaticos: boolean = userData?.viaticos ?? userData?.Viaticos ?? false;
  const viaticosNivel: number = userData?.viaticosNivel ?? userData?.ViaticosNivel ?? 0;
  const municipio: ID = userData?.municipio ?? userData?.Municipio ?? 0;
  const oficina: ID = userData?.oficina ?? userData?.Oficina ?? 0;

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
  };
};