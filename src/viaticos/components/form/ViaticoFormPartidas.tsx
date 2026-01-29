import { CalculoViaticoResult } from "../../../types";


interface Props {
  calculo: CalculoViaticoResult | null;
  oficina: number;
  ejercicio: number;
  noViat: number;
}

/**
 * Tabla de partidas presupuestales
 */
export const ViaticoFormPartidas = ({ calculo, oficina, ejercicio, noViat }: Props) => {
  return (
    <div className="row gx-4 mt-3">
      <div className="col">
        <table className="table table-bordered table-sm">
          <thead className="text-center">
            <tr>
              <th>PARTIDA</th>
              <th>DESCRIPCION</th>
              <th>IMPORTE</th>
              <th>OFI</th>
              <th>ANO</th>
              <th>VIAT</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{calculo?.partida || '-'}</td>
              <td>{calculo?.descripcionPartida || '-'}</td>
              <td>{calculo?.importe.toFixed(2) || '0.00'}</td>
              <td>{oficina}</td>
              <td>{ejercicio}</td>
              <td>{noViat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};