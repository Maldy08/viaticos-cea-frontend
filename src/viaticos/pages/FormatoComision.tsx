import { FormatoComisionReporte } from "../../interfaces/interfaces"

const data = {} as FormatoComisionReporte;

interface Props {
  oficina?:number;
  ejercicio?:number;
  noviat?:number;
}
export const FormatoComision = ( { oficina=0, ejercicio=0, noviat=0 } : Props)  => {
  return (
    <div>
      <h3>Formato Comision</h3>
      <span>{ oficina }</span>
      <span>{ ejercicio }</span>
      <span>{ noviat }</span>
    </div>
  )
}
