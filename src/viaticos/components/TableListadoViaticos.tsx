import moment from "moment";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";
import 'bootstrap/dist/css/bootstrap.min.css'
import { DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import '../styles/ListadoViaticos.css';
import { Button } from 'reactstrap';
import { useUiStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { viaticosApiUrl } from "../../api/viaticosApi";


interface Props {
  ejercicio:number;
  empleado:number;
}

export const TableListadoViaticos = ( { ejercicio, empleado }: Props ) => {
 const { isLoading,listviaticos, startLoadingViaticosByEmpleado , startGetViaticoByEjercicioOficinaNoviat} = useViaticosStore();
 const { modificarViatico, setModificarViatico } = useUiStore();
 const navigate = useNavigate();

 useEffect(() => {
   startLoadingViaticosByEmpleado( ejercicio, empleado );
 }, [])

 
const abrirFormato = (formato:string, oficina: number, ejercicio: number, noViatico: number) => {
  const element = document.createElement("a");
  element.href = `${viaticosApiUrl}/Pdf/${formato}?ejercicio=${ ejercicio }&oficina=${ oficina }&noviat=${ noViatico }`;
  element.download = "a.pdf";
  element.click();
}

const onModificarViatico = (oficina: number, ejercicio: number, noViatico: number) => {
  const link = "capturar-viatico/"+ oficina +"/" + ejercicio +"/" + noViatico;
  modificarViatico();
  setModificarViatico( oficina, ejercicio, noViatico );
  startGetViaticoByEjercicioOficinaNoviat(oficina,ejercicio,noViatico);
  
  navigate("/capturar-viatico", {

  })
  //<Navigate to="/capturar-viatico" replace={true}/>
  //window.open(link, '_self');
}


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
  editar:boolean;
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
        <DropdownToggle caret  className="guinda">
        Formatos
      </DropdownToggle>
      <DropdownMenu container={'body'}>
        <DropdownItem onClick={() => abrirFormato("TresFormatos",row.oficina,row.ejercicio,row.viatico)}>Formato Completo</DropdownItem>
        <DropdownItem onClick={() => abrirFormato("FormatoComision",row.oficina,row.ejercicio,row.viatico)}>Formato Comisión</DropdownItem>
        <DropdownItem onClick={() => abrirFormato("ReciboViatico",row.oficina,row.ejercicio,row.viatico)}>Recibo Viatico</DropdownItem>
        <DropdownItem onClick={() => abrirFormato("InformeActividades",row.oficina,row.ejercicio,row.viatico)}>Informe</DropdownItem>
      </DropdownMenu>
      </UncontrolledDropdown>
      
    },
    
    {

      name: 'Editar',
      cell: (row: any) => <Button className="guinda" color="secondary" disabled={row.estatus > 1}  size="sm" onClick={ () => onModificarViatico(row.oficina,row.ejercicio,row.viatico) }>
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
      selector: row => row.estatus == '1' ? 'Creado' : row.estatus == '2'? 'Pagado de C.C' : row.estatus == '3'? 'Registrado en Cont.' : row.estatus == '4'? 'Pagado en Cont.' : '',
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
