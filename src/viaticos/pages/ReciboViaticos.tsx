import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useViaticosStore } from "../../hooks";

import { getMes } from '../../helpers';
import '../styles/ReciboViaticos.css';
import logo from "../../assets/logobcycea.jpg";
import { FormatoComision } from "./FormatoComision";

export const ReciboViaticos = () => {

    let fechaViatico = new Date();
    let fechaSalida = new Date();
    let fechaRegreso = new Date();


    const { isLoading, formatoComision, startGetFormatoComision} = useViaticosStore();
    const { oficina, ejercicio, noviat } = useParams();

    useEffect(() => {
        startGetFormatoComision(  parseInt(oficina!) , parseInt(ejercicio!), parseInt(noviat!) );
      }, [])

    if( !isLoading ){
        fechaViatico = new Date( formatoComision.fecha );
        fechaSalida = new Date( formatoComision.fechaSal );
        fechaRegreso = new Date( formatoComision.fechaReg );
    }

  return (
    <>
    {
        isLoading? <div><h3>Cargando información.....</h3></div>
        :
        <div className="recibo-viaticos">
            <div className="container mt-4">
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <img src={ logo } alt="logo" style={{ width: '85%'}} />
                    </div>
                    <div className="p-2">
                        <div className="d-flex flex-column text-center">
                            <span><strong>COMISION ESTATAL DEL AGUA DE BAJA CALIFORNIA</strong></span>
                            <span>OFICINA CEA { formatoComision.cdOrigen }</span>
                            <span>RECIBO DE VIATICOS</span>
                        </div>
                    </div>

                </div>
            </div>
            <hr/>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 border">
                        <div className="p-2"><span className="gris">BUENO POR: </span><span><b>{`$${ formatoComision.importe.toFixed(2)}`}</b></span></div>
                    </div>

                    <div className="col border">
                        <div className="p-2"> <span className="gris">NO. DE OFICIO: </span> <span><b>{`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`}</b></span></div>
                        <div className="p-2"><span className="gris">FECHA: </span><span>{ `${fechaViatico.getDate().toString()} DE ${ getMes( fechaViatico )} DE ${ formatoComision.ejercicio }` }</span></div>
                    </div>
                    
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-3 border">
                        <div className="p-2 gris">NOMBRE:</div>
                        <div className="p-2 gris">DEPARTAMENTO:</div>
                        <div className="p-2 gris">PUESTO:</div>
                    </div>
                    <div className="col border">
                        <div className="p-2">{`${formatoComision.nombre} ${formatoComision.paterno} ${formatoComision.materno} ( ${formatoComision.noEmp})`}</div>
                        <div className="p-2">{`${formatoComision.deptoDescripcion}`}</div>
                        <div className="p-2">{`${formatoComision.descripcionPuesto}`}</div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row border">
                    <div className="p-2 text-center gris">DATOS DE LA COMISION</div>
                </div>
                <div className="row border">
                    <div className="col text-center datos-comision-titulos gris">ORIGEN</div>
                    <div className="col text-center datos-comision-titulos gris">DESTINO</div>
                    <div className="col text-center datos-comision-titulos gris">FECHA INICIO</div>
                    <div className="col text-center datos-comision-titulos gris">FECHA TERMINO</div>
                    <div className="col text-center datos-comision-titulos gris">DIAS</div>
                    <div className="col text-center datos-comision-titulos gris">IMPORTE</div>
                </div>
                <div className="row border p-2">
                    <div className="col text-center">{`${formatoComision.cdOrigen}`} <br /> {`${formatoComision.edoOrigen}`}</div>
                    <div className="col text-center">{`${formatoComision.cdDestino}`} <br /> {`${formatoComision.edoDestino}`}</div>
                    <div className="col text-center">{`${fechaRegreso.toLocaleString().split(',')[0]}`}</div>
                    <div className="col text-center">{`${fechaSalida.toLocaleString().split(',')[0]}`} </div>
                    <div className="col text-center">{`${formatoComision.dias}`} </div>
                    <div className="col text-center">${`${formatoComision.importe.toFixed(2)}`} </div>
                </div>
                <div className="row border">
                    <div className="col-3 text-center gris">MOTIVO</div>
                    <div className="col text-center gris">ACTIVIDADES</div>
                </div>
                <div className="row border">
                    <div className="col-5 p-4 text-justify fontsize-10">{`${formatoComision.motivo}`} </div>
                    <div className="col p-4 text-justify fontsize-10">{`${formatoComision.inforAct}`} </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row border">
                    <div className="col p-1 text-center gris">AUTORIZO</div>
                    <div className="col p-1 text-center gris">RECIBI</div>
                </div>
                <div className="row border">
                    <div className="col mt-5 d-flex flex-column align-items-center">
                        <hr style={{width:'75%'}}/>
                        <div  className="font-weight-bold"><b> {`${formatoComision.quienLoComisiona}`}</b> </div>
                        <div className="p-1">{`${formatoComision.puestoQuienLoComisiona}`}</div>
                    </div>
                    <div className="col mt-5 d-flex flex-column align-items-center"> 
                    <hr style={{width:'75%'}}/>
                        <div  className="font-weight-bold"><b>{`${formatoComision.nombre} ${formatoComision.paterno} ${formatoComision.materno}`}</b> </div>
                        <div className="p-1">{`${formatoComision.descripcionPuesto}`}</div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
  )
  
}
