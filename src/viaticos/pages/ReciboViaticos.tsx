import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useViaticosStore } from "../../hooks";

import { getMes } from '../../helpers';
import '../styles/ReciboViaticos.css';
import logo from "../../assets/logobcycea.jpg";

export const ReciboViaticos = () => {

    let fechaViatico = new Date();
    let fechaSalida = new Date();
    let fechaRegreso = new Date();

    const { isLoading, formatoComision, startGetFormatoComision} = useViaticosStore();
    const { oficina, ejercicio, noviat } = useParams();

    useEffect(() => {
        startGetFormatoComision( 1, 2022, 2 );
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
                    <div className="col-md-6 col-sm-6 border">
                        <div className="p-2"><span>BUENO POR: </span><span><b>{`$${ formatoComision.importe}`}</b></span></div>
                    </div>

                    <div className="col-md-6 col-sm-6 border">
                        <div className="p-2">NO. DE OFICIO: <span><b>{`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`}</b></span></div>
                        <div className="p-2">FECHA: <span>{ `${fechaViatico.getDate().toString()} DE ${ getMes( fechaViatico )} DE ${ formatoComision.ejercicio }` }</span></div>
                    </div>

                </div>

            </div>

        </div>
    }
    </>
  )
  
}
