import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/logobcycea.jpg";
import { useViaticosStore } from "../../hooks";
import '../styles/ReciboViaticos.css';


export const ReciboViaticos = () => {

    const { isLoading, formatoComision, startGetFormatoComision} = useViaticosStore();
    const { oficina, ejercicio, noviat } = useParams();

    useEffect(() => {
        startGetFormatoComision( 1, 2022, 2 );
      }, [])

  return (
    <>
    {
        isLoading? <div><h3>Cargando informacion.....</h3></div>
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

            <div className="container mt-2">
                <div className="d-grid justify-content-start">
                    <div className="p-2">
                        <div><span>BUENO POR: </span><span><b>{`$${ formatoComision.importe}`}</b></span></div>
                    </div>

                </div>
            </div>

            <div className="container mt-4">
                <div className="d-flex flex-row">
                    
                </div>
            </div>
        </div>
    }
    </>
  )
  
}
