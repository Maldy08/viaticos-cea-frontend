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
 }, [ejercicio, empleado])

 
const abrirFormato = (formato:string, oficina: number, ejercicio: number, noViatico: number) => {
  console.log("abrirFormato", formato, oficina, ejercicio, noViatico);
  let url = `${viaticosApiUrl}api/Viatico/${formato}/${ ejercicio }/${ oficina }/${ noViatico }`;
  //console.log("url", url);
  
  const element = document.createElement("a");
  element.href = url;
  element.download = "a.pdf";
  element.click();
}

//  const abrirCompleto = (oficina: number, ejercicio: number, noViatico: number) => {
//   const element = document.createElement("a");
  
//   element.href = `${ viaticosApiUrl }/Pdf/TresFormatos?ejercicio=${ ejercicio }&oficina=${ oficina }&noviat=${ noViatico }`;
//   element.download = "a.pdf";
//   element.click();
// }

// const abrirComision = (oficina: number, ejercicio: number, noViatico: number) => {
//   const element = document.createElement("a");
//   element.href = `${viaticosApiUrl}/Pdf/FormatoComision?ejercicio=${ ejercicio }&oficina=${ oficina }&noviat=${ noViatico }`;
//   element.download = "a.pdf";
//   element.click();
// }

// const abrirRecibo = (oficina: number, ejercicio: number, noViatico: number) => {
//   const element = document.createElement("a");
//   element.href = `${ viaticosApiUrl }/Pdf/ReciboViatico?ejercicio=${ ejercicio }&oficina=${ oficina }&noviat=${ noViatico }`;
//   element.download = "a.pdf";
//   element.click();
// }

// const abrirInforme = (oficina: number, ejercicio: number, noViatico: number) => {
//   const element = document.createElement("a");
//   element.href = `${ viaticosApiUrl }/Pdf/InformeActividades?ejercicio=${ ejercicio }&oficina=${ oficina }&noviat=${ noViatico }`;
//   element.download = "a.pdf";
//   element.click();
// }

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
  motivo:string;
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
      width: '90px',
      center: true,
    },
    
    { 
      name: 'Fecha',
      selector: row => moment(row.fecha).format('DD/MM/YYYY'),
      sortable: true,
      width: '10',
      
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
      compact: true,
      wrap: true,
      width: '95px'
    },
    { 
      name: 'Motivo',
      selector: row => row.motivo,
      grow: 3,
      compact: true,
      wrap: true,
    },
    {
      name: 'Formato',
      center: true,
      compact: true,
      cell: (row: any) => row.estatus != '9' ? 
      <UncontrolledDropdown size="sm" direction="down" >
      <DropdownToggle caret  className="guinda">
      Formatos
    </DropdownToggle>
    <DropdownMenu container={'body'} style={{fontSize: 15}}>
      <DropdownItem onClick={() => abrirFormato("TresFormatos",row.oficina,row.ejercicio,row.viatico)}>Formato Completo</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("FormatoComision",row.oficina,row.ejercicio,row.viatico)}>Formato Comisión</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("ReciboViatico",row.oficina,row.ejercicio,row.viatico)}>Recibo Viatico</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("InformeActividades",row.oficina,row.ejercicio,row.viatico)}>Informe</DropdownItem>
    </DropdownMenu>
    </UncontrolledDropdown>
    :
    <UncontrolledDropdown size="sm" direction="down" >
      <DropdownToggle caret  className="guinda" disabled >
      Formatos
    </DropdownToggle>
    <DropdownMenu container={'body'} style={{fontSize: 15}}>
      <DropdownItem onClick={() => abrirFormato("TresFormatos",row.oficina,row.ejercicio,row.viatico)}>Formato Completo</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("FormatoComision",row.oficina,row.ejercicio,row.viatico)}>Formato Comisión</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("ReciboViatico",row.oficina,row.ejercicio,row.viatico)}>Recibo Viatico</DropdownItem>
      <DropdownItem onClick={() => abrirFormato("InformeActividades",row.oficina,row.ejercicio,row.viatico)}>Informe</DropdownItem>
    </DropdownMenu>
    </UncontrolledDropdown>
      
    },
    
    {
     
      center: true,
      name: 'Editar',
      cell: (row: any) => <Button className="guinda" color="secondary" disabled={row.estatus > 1}  size="sm" onClick={ () => onModificarViatico(row.oficina,row.ejercicio,row.viatico) }>
        ✎
      </Button>
      
    },

    { 
      name: 'Salida',
      selector: row => moment( row.salida ).format('DD/MM/YYYY'),
      sortable: true,
      compact: true,
    },
    { 
      name: 'Regreso',
      selector: row => moment( row.regreso ).format('DD/MM/YYYY'),
      sortable: true,
      compact: true,
    },
    { 
      name: 'Estatus',
      selector: row => row.estatus == '1' ? 'Creado' : row.estatus == '2'? 'Pagado de C.C' : row.estatus == '3'? 'Registrado en Cont.' : row.estatus == '4'? 'Pagado en Cont.' : row.estatus == '9'? 'Cancelado' : '',
      sortable: true,
      
      wrap: true,
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
          className="posicion2 "
      />
    </div>
  )
}
