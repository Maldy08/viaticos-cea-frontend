import moment from "moment";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import '../styles/ListadoViaticos.css';
import { FormatoComision } from "../pages";
import { Button } from 'reactstrap';



const abrirComision = (oficina: number, ejercicio: number, noViatico: number) => {
    const link = "formato-comision/"+ oficina +"/" + ejercicio +"/" + noViatico;
  window.open(link, '_blank');
}

const abrirRecibo = (oficina: number, ejercicio: number, noViatico: number) => {
  const link = "recibo-viatico/"+ oficina +"/" + ejercicio +"/" + noViatico;
  window.open(link, '_blank');
}

const abrirInforme = (oficina: number, ejercicio: number, noViatico: number) => {
  const link = "informe-actividades/"+ oficina +"/" + ejercicio +"/" + noViatico;
  window.open(link, '_blank');
}

// const botonEditarDisponible = (estatus: string) => {
//   if (estatus == '1'){
//     <Button color="secondary" size="sm">
//         ✎
//       </Button>
//   }
//   else {
//     <Button color="secondary" size="sm" dis>
//         ✎
//       </Button>
//   }
// }

interface DataRow {
  viatico:number;
  fecha:Date; //date
  origen:string;
  destino:string;
  movito:string;
  salida:Date; //date
  regreso:Date; //date
  estatus:string;
  oficina: number;
  ejercicio: number;
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
      name: 'Formato',
      cell: (row: any) => <UncontrolledDropdown size="sm" direction="down" >
        <DropdownToggle caret >
        Formatos
      </DropdownToggle>
      <DropdownMenu container={'body'}>
        <DropdownItem onClick={() => abrirComision(row.oficina,row.ejercicio,row.viatico)}>Formato Comisión</DropdownItem>
        <DropdownItem onClick={() => abrirRecibo(row.oficina,row.ejercicio,row.viatico)}>Recibo Viatico</DropdownItem>
        <DropdownItem onClick={() => abrirInforme(row.oficina,row.ejercicio,row.viatico)}>Informe</DropdownItem>
      </DropdownMenu>
      </UncontrolledDropdown>
      
    
    },
    {
      name: 'Editar',
      cell: (row: any) => <Button color="secondary" size="sm">
        ✎
      </Button>
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
    }
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
  const { listviaticos } = useViaticosStore();
  
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
          className="posicion2"
      />
    </div>
  )
}
