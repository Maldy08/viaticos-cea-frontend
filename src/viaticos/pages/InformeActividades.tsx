import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useViaticosStore } from "../../hooks";

import { getMes } from '../../helpers';
import '../styles/InformeActividades.css';
import logo from "../../assets/logobcycea.jpg";
import { FormatoComision } from "./FormatoComision";

export const InformeActividades = () => {

    let fechaViatico = new Date();
    let fechaSalida = new Date();
    let fechaRegreso = new Date();


    const { isLoading, formatoComision, startGetFormatoComision} = useViaticosStore();
    const { oficina, ejercicio, noviat } = useParams();

    useEffect(() => {
        startGetFormatoComision( 2 , 2022, 1 );
      }, [])

    if( !isLoading ){
        fechaViatico = new Date( formatoComision.fecha );
        fechaSalida = new Date( formatoComision.fechaSal );
        fechaRegreso = new Date( formatoComision.fechaReg );
    }

    return(
        <>
        {
            isLoading? <div><h3>Cargando información.....</h3></div>
            :
            
            <div className="informe-actividades">
                <div className="container mt-4">
                    <div className="d-flex flex-row">
                        <div className="p-2">
                            <img src={ logo } alt="logo" style={{ width: '85%'}} />
                        </div>
                        <div className="p-2">
                            <div className="d-flex flex-column text-center">
                                <span><strong>COMISION ESTATAL DEL AGUA DE BAJA CALIFORNIA</strong></span>
                                <span>OFICINA CEA { formatoComision.cdOrigen }</span>
                                <span>INFORME DE ACTIVIDADES</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4 d-flex justify-content-end">
                    <div className="col-2">
                        <div className="p-2 gris">FECHA DEL INFORME: </div>
                        <div className="p-2 gris">NO. DE OFICIO</div>
                    </div>
                    <div className="col-2">
                        <div className="p-2"> {`${fechaViatico.getDate().toString()} DE ${ getMes( fechaViatico )} DE ${ formatoComision.ejercicio }`}</div>
                        <div className="p-2"><b>{`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`}</b></div>
                    </div>
                </div>
                <div className="container">
                    <b>A QUIEN CORRESPONDA:</b>
                </div>
                <div className="container mt-4">
                    <p className="text-justify">
                        POR ESTE MEDIO ME PERMITO ENTREGAR A USTED CON FUNDAMENTO EN LA FRACCIÓN IX DEL ARTÍCULO 70
                        DE LA LEY GENERAL DE TRANSPARENCIA Y ACCESO A LA INFORMACIÓN PÚBLICA (LGT) PARA EL ESTADO DE
                        BAJA CALIFORNIA, EL INFORME CORRESPONDIENTE A LA COMISIÓN NO. {`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`} EL CUAL SE ME FUE ASIGNADA
                        CON FECHA DEL { `${fechaViatico.getDate().toString()} DE ${ getMes( fechaViatico )}` } DEL PRESENTE AÑO.
                    </p>
                </div>
                <div className="container mt-4">
                    <div className="row border">
                        <div className="p-1 text-center gris titulos">DATOS DE LA COMISION</div>
                    </div>
                    <div className="row border">
                        <div className="col text-center titulos gris">ORIGEN</div>
                        <div className="col text-center titulos gris">DESTINO</div>
                        <div className="col text-center titulos gris">FECHA INICIO</div>
                        <div className="col text-center titulos gris">FECHA TERMINO</div>
                        <div className="col text-center titulos gris">DIAS</div>
                    </div>
                    <div className="row border p-2">
                        <div className="col text-center">{`${formatoComision.cdOrigen}`} <br /> {`${formatoComision.edoOrigen}`}</div>
                        <div className="col text-center">{`${formatoComision.cdDestino}`} <br /> {`${formatoComision.edoDestino}`}</div>
                        <div className="col text-center">{`${fechaRegreso.toLocaleString().split(',')[0]}`}</div>
                        <div className="col text-center">{`${fechaSalida.toLocaleString().split(',')[0]}`} </div>
                        <div className="col text-center">{`${formatoComision.dias}`} </div>
                    </div>
                    <div className="row border">
                        <div className="col text-center titulos gris">MOTIVO</div>
                    </div>
                    <div className="row border">
                        <div className="col mb-4 pt-1 text-justify">{`${formatoComision.motivo}`} </div>
                    </div>
                    <div className="row border">
                        <div className="col text-center titulos gris">ACTIVIDADES</div>
                    </div>
                    <div className="row border">
                        <div className="col mb-4 pt-1 text-justify">{`${formatoComision.inforAct}`} </div>
                    </div>
                    <div className="row border">
                        <div className="col text-center titulos gris">CONCLUSIONES Y RESULTADOS</div>
                    </div>
                    <div className="row border">
                        <div className="col mb-4 pt-1 text-justify">{`${formatoComision.inforResul}`}   </div>
                    </div>
                </div>
                <div className="container">
                    <div className="mt-4">
                        <div className="gris text-center mb-6 atent"> A T E N T A M E N T E </div>
                    </div>
                    <div className="col mt-5 d-flex flex-column align-items-center">
                        <hr style={{width:'35%'}}/>
                        <div  className="font-weight-bold"><b> {`${formatoComision.quienLoComisiona} ( ${formatoComision.noEmp})`}</b> </div>
                        <div className="p-1">{`${formatoComision.puestoQuienLoComisiona}`}</div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}