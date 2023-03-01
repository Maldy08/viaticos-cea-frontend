export interface User {
    usuario:number;
    login:string;
    pass:string;
    activo:boolean;
    depto:number;
    noEmpleado:number;
    viaticos:boolean;
    viaticosNivel:number;
    deptoDescripcion:string;
    nombreCompleto:string;
    idPue:number;
    descripcion:string;
    municipio:number;
    oficina:number;
}

export interface Deptos {
    id:number;
    idCea:number;
    idShpoa: number;
    descripcion:string;
    nivel:number;
    oficial:number;
    idReporta:number;
    agrupaPoa:number;
    meta:number;
    accion:number;
    prog:string;
    empRespon:number;
    agrupaDir: number
}

export interface Viaticos {
  oficina:number;
  ejercicio:number;
  noViat:number;
  fecha:Date; //date
  noEmp:number;
  origenId:number;
  destinoId:number;
  motivo:string;
  fechaSal:Date; //date
  fechaReg:Date; //date
  dias:number;
  inforFecha:Date //date
  inforAct:string;
  nota:string;
  estatus:number;
  fechaMod:Date; //date
  pol:number;
  polMes:number;
  caja:number;
  cajaVale:number;
  cajaRepo:number;
  noEmpCrea:number;
  inforResul:string;

}

export interface ViaticosPart {
  oficina:number;
  ejercicio:number;
  noviat:number;
  partida:number;
  importe:number;

}

export interface ListViaticos {
  viatico:number;
  fecha:string; //date
  origen:string;
  destino:string;
  motivo:string;
  salida:string; //date
  regreso:string; //date
  estatus:string;
}

export interface Empleado {
  idEmpleado: number;
  nombre: string;
  paterno: string;
  materno: string;
  nivel: number;
  depto: number;
  obra: number;
  deptoPpto: number;
  municipio: number;
  activo: string
}

export interface VistaEmpledo {
  activo:string;
  empleado:number;
  paterno:string;
  materno:string;
  nombre:string;
  idPue:number;
  descripcionPuesto:string;
  deptoue:number;
  descripcionDepto:string;
  deptocomi:number;
  nombreCompleto:string;
  municipio:number;
  oficina:number;
  nivel:number;
  
}

export interface Oficina {
  idOfi:number;
  nombre: string;
  rutaTrans: string;
}

export interface Ciudades {
  idCiudad:number;
  idEstado:number;
  ciudad:string;
}

export interface Estados {
  idEstado:number;
  idPais:number;
  estado:string;
}

export interface Paises {
  idPais:number;
  pais:string;
}

export interface ViaticosConsecutivo {
 consecutivo:number;
}

export interface FormatoComisionReporte {
  oficina:number;
  ejercicio:number;
  noViat:number;
  fecha:Date;
  noEmp:number;
  origenId:number;
  destinoId:number;
  motivo:string;
  fechaSal:Date;
  fechaReg:Date;
  dias:number;
  inforAct:string;
  importe:number;
  nombre:string;
  materno:string;
  paterno:string;
  descripcionPuesto:string
  cdOrigen:string;
  cdDestino:string;
  quienLoComisiona:string;
  puestoQuienLoComisiona:string;
  edoOrigen:string;
  edoDestino:string;
  deptoDescripcion:string;
  inforResul:string;
}
