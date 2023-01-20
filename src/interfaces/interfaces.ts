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
  fecha:string; //date
  noEmp:number;
  origenId:number;
  destinoId:number;
  motivo:string;
  fechaSal:string; //date
  fechaReg:string; //date
  dias:number;
  inforFecha:string //date
  inforAct:string;
  nota:string;
  estatus:number;
  fechaMod:string; //date
  pol:number;
  polMes:number;
  caja:number;
  cajaVale:number;
  cajaRepo:number;
  noEmpCea:number;
  inforResult:string;

}

export interface ViaticosPart {
  oficina:number;
  ejercicio:number;
  noviat:number;
  partida:number;
  import:number;

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

/* "usuario": 1;
  "login": "A",
  "pass": "Z",
  "activo": true,
  "compras": true,
  "comprasNivel": true,
  "almacen": true,
  "almacenNivel": true,
  "activos": true,
  "activosNivel": true,
  "contabilidad": true,
  "contabilidadNivel": true,
  "presupuestos": true,
  "presupuestosNivel": true,
  "nominas": false,
  "nominasNivel": false,
  "depto": 23,
  "noEmpleado": 7120,
  "bd": true,
  "caja": false,
  "cajaNivel": false,
  "polnom": " ",
  "viaticos": true,
  "viaticosNivel": true,
  "vales": true,
  "valesNivel": true,
  "deptoDescripcion": "COORDINACION DE INFORMATICA",
  "nombreCompleto": "MANUEL REYES RAMIREZ",
  "idPue": 97,
  "descripcion": "COORDINADOR DE INFORMATICA" */