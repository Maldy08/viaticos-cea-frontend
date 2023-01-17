import moment from "moment";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";

interface DataRow {
  viatico:number;
  fecha:Date; //date
  origen:string;
  destino:string;
  movito:string;
  salida:Date; //date
  regreso:Date; //date
  estatus:string;
}

   const columns: TableColumn<DataRow>[] = [
    { 
      name: 'No. Viático',
      selector: row => row.viatico,
      sortable: true,
    },
    { 
      name: 'Fecha',
      selector: row => moment(row.fecha).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Origen',
      selector: row => row.origen,
      sortable: true,
    },
    { 
      name: 'Destino',
      selector: row =>  row.destino,
      sortable: true,
    },
    { 
      name: 'Motivo',
      selector: row => row.movito,
      grow: 3
    },
    { 
      name: 'Salida',
      selector: row => moment( row.salida ).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Regreso',
      selector: row => moment( row.regreso ).format('DD/MM/YYYY'),
      sortable: true,
    },
    { 
      name: 'Estatus',
      selector: row => row.estatus,
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

export const TableListadoViaticos = ( { ejercicio, empleado }: Props ) => {
  const { listviaticos, startLoadingViaticosByEmpleado } = useViaticosStore();
  

  useEffect(() => {
    startLoadingViaticosByEmpleado( ejercicio, empleado );
  }, [])


  return (
    <div className="">
      <DataTable
          columns={ columns }
          customStyles={ customStyles }
          data = { listviaticos }
          defaultSortFieldId={ 1 }
          pagination
          paginationComponentOptions={ paginacionOpciones }
          fixedHeader
          fixedHeaderScrollHeight="600px"
      />
    </div>
  )
}
