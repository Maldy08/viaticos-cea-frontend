import { FormatoComisionReporte } from "../../interfaces/interfaces"
import logo from "../../assets/logobcycea.jpg";
import { useViaticosStore } from "../../hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const data = {} as FormatoComisionReporte;

interface Props {
  oficina?:number;
  ejercicio?:number;
  noviat?:number;
}
export const FormatoComision = ()  => {

  const { startGetFormatoComision, formatoComision, isLoading } = useViaticosStore();
  const { oficina, ejercicio, noviat } = useParams();

  useEffect(() => {
    startGetFormatoComision( 1, 2022, 2 );
  }, [])
  

  const getMes = ( mes:number ):string =>  {

    let mesString:string = "";

     switch ( mes ) {
      case 1:
        mesString="ENERO"    
        break;
      case 2:
        mesString="FEBRERO"
        break;
      case 3:
        mesString="MARZO"
        break;
      case 4:
          mesString="ABRIL"
          break;
      case 5:
          mesString="MAYO"
          break;
      case 6:
          mesString="JUNIO"
          break;
      case 7:
          mesString="JULIO"
          break;
      case 8:
          mesString="AGOSTO"
          break;
      case 9:
          mesString="SEPTIEMBRE"
          break;
      case 10:
          mesString="OCTUBRE"
          break;
      case 11:
          mesString="NOVIEMBRE"
          break;
      case 12:
          mesString="DICIEMBRE"
          break;

     }

    return mesString;
  }

  return (

    <>
     {
       isLoading? 
        <div><h3>Cargando informacion.....</h3></div>
        : 

        <div>
        <div className="container mt-4">
          <div className="d-flex flex-row">
            <div className="p-2">
              <img src={ logo } alt="logo" style={{ width: '90%'}} />
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

        <div className="container mt-5">
          <div className="d-grid justify-content-end">
            <div className="p-2"><span>{ formatoComision.fecha.toString() }</span></div>
            <div className="p-2"><span>NO. DE OFICIO: <strong>{`V${formatoComision.oficina}-${ formatoComision.noViat }/${ formatoComision.ejercicio }`}</strong></span></div>
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

        {/* <div className="container mt-4">
          <div className="d-flex flex-row">
            <div className="p-2">
              <p>{`POR MEDIO DE LA PRESENTE SE LE COMUNICA A USTED, QUE DEBERA TRASLADARSE
                A LA CIUDAD DE ${ formatoComision.cdDestino },${ formatoComision.edoDestino}
                 EL DIA ${ formatoComision.fechaSal.getUTCDay.toString() } 
                 DE ${ getMes( formatoComision.fechaSal.getMonth() + 1 ) },
                  ${ `(${formatoComision.dias.toString()})` } DIA(S) DEL PRESENTE AÑO CON LA FINALIDAD DE:`}
                  <br /><br />
                  <strong>{ formatoComision.motivo }</strong>
              </p>
            </div>
          </div>
        </div> */}

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
