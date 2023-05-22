import { FormatoComisionReporte } from "../../interfaces/interfaces"
import { useViaticosStore } from "../../hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getMes } from '../../helpers';
import logo from "../../assets/logobcycea.jpg";
import '../styles/FormatoComision.css';

const data = {} as FormatoComisionReporte;

interface Props {
  oficina?:number;
  ejercicio?:number;
  noviat?:number;
}

export const FormatoComision = ()  => {

  const { startGetFormatoComision, formatoComision, isLoading } = useViaticosStore();
  const { oficina, ejercicio, noviat } = useParams();
  let fechaViatico = new Date();
  let fechaSalida = new Date();

  useEffect(() => {
    startGetFormatoComision( parseInt(oficina!) , parseInt(ejercicio!), parseInt(noviat!)  );

  }, [])
  

  if( !isLoading ){
    fechaViatico = new Date( formatoComision.fecha );
    fechaSalida = new Date( formatoComision.fechaSal );
   // alert(noviat);
  }

  return (
    <>
     {
       isLoading? 
        <div><h3>Cargando informacion.....</h3></div>
        : 

        <div className="formato-comision">
          <div className="container mt-4">
            <div className="d-flex flex-row">
              <div className="p-2">
                <img src={ logo } alt="logo" style={{ width: '85%'}} />
              </div>
              <div className="p-2">
                <div className="d-flex flex-column text-center">
                  <span><strong>COMISION ESTATAL DEL AGUA DE BAJA CALIFORNIA</strong></span>
                  <span>OFICINA CEA { formatoComision.cdOrigen }</span>
                  <span>FORMATO DE COMISION</span>
                </div>
              </div>
            </div>
          </div>

          <hr />
          
          {/* sacar el dia de una fecha getDate */}
          {/* sacar el mes de una fecha getMonth */}
          <div className="container mt-2">
            <div className="d-grid justify-content-end">
              <div className="p-2">
                <div><span>{ `${fechaViatico.getDate().toString()} DE ${ getMes( fechaViatico )} DE ${ formatoComision.ejercicio }` }</span></div>
                <div><span>NO. DE OFICIO: <strong>{`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`}</strong></span></div>
              </div>
            </div>
          </div>


          <div className="container mt-2">
            <div className="d-flex flex-column">
              <div className="p-2">
                <div><span><strong>{`${ formatoComision.nombre } ${ formatoComision.paterno } ${ formatoComision.materno }`}</strong></span></div>
                <div><span><strong>{ formatoComision.deptoDescripcion }</strong></span></div>
                <div><span><strong>{ formatoComision.descripcionPuesto }</strong></span></div>
                <div><span><strong>P R E S E N T E .-</strong></span></div>
              </div>
            </div>
          </div>
          

          <div className="container mt-4">
            <div className="d-flex flex-row">
              <div className="p-2">
                <p style={{ textAlign: 'justify'}}>{`POR MEDIO DE LA PRESENTE SE LE COMUNICA A USTED, QUE DEBERA TRASLADARSE
                  A LA CIUDAD DE ${ formatoComision.cdDestino }, ${ formatoComision.edoDestino }
                  EL DIA ${ fechaSalida.getDate().toString() } 
                  DE ${ getMes( fechaSalida ) },
                    ${ `(${formatoComision.dias.toString()})` } DIA(S) DEL PRESENTE AÑO CON LA FINALIDAD DE:`}
                    <br /><br />
                    <strong>{ formatoComision.motivo }</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="container mt-2">
            <div className="d-flex flex-row">
              <div className="p-2">
                <p>REALIZANDO LAS SIGUIENTES ACTIVIDADES: <br /><br />
                <strong>{ formatoComision.inforAct }</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: '125px'}}>
            <div className="text-center">
              <div className="p-2">
                <p>
                  ____________________________________________________________
                  <br />
                  <strong>{ formatoComision.quienLoComisiona }</strong> <br />
                  <span>{ formatoComision.puestoQuienLoComisiona }</span>
                </p>
              </div>
            </div>
          </div>

        </div>
     }
      
    </>
  )
}
