import moment from "moment";
import { useEffect } from "react";
import DataTable, {createTheme} from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";

   const columns = [
    { 
      name: 'No. Viático',
      selector: (row: any)=>  row.viatico,
      sortable: true,
    },
    { 
      name: 'Fecha',
      selector: (row: any)=>  moment(row.fecha).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Origen',
      selector: (row: any)=>  row.origen,
      sortable: true,
    },
    { 
      name: 'Destino',
      selector: (row: any)=>  row.destino,
      sortable: true,
    },
    { 
      name: 'Motivo',
      selector: (row: any)=>  row.movito,
      grow: 3
    },
    { 
      name: 'Salida',
      selector: (row: any)=>  moment(row.fechaSal).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Regreso',
      selector: (row: any)=>  moment(row.fechaReg).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Estatus',
      selector: (row: any)=>  row.estatus,
      sortable: true,
    },
  ]

  const customStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '4px', // override the cell padding for data cells
            paddingRight: '4px',
        },
    },
  };

  const paginacionOpciones ={
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }
  
   interface Props {
      ejercicio:number;
      empleado:number;
  }

export const TableListadoViaticos = ({ ejercicio, empleado }: Props) => {
  const { listviaticos, startLoadingViaticosByEmpleado } = useViaticosStore();

  useEffect(() => {
    startLoadingViaticosByEmpleado( ejercicio, empleado );
  }, [])


  return (
    <div className="table-responsive">
    <DataTable
        columns={columns}
        customStyles={customStyles}
        data = { listviaticos }
        defaultSortFieldId={ 1 }
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
    />
    </div>
  )
}
