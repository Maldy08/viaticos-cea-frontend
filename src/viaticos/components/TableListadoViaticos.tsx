import moment from "moment";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import 'styled-components';
import { useViaticosStore } from "../../hooks/useViaticosStore";
import 'bootstrap/dist/css/bootstrap.min.css'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import '../styles/ListadoViaticos.css';
import { Button } from 'reactstrap';
import { useUiStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { viaticosApiUrl } from "../../api/viaticosApi";
import type { ViaticoListItem } from "../../types/viaticos/viatico.types";
import type { ID } from "../../types/common/base.types";

interface Props {
  ejercicio: number;
  empleado: ID;
}

export const TableListadoViaticos = ({ ejercicio, empleado }: Props) => {
  const { isLoading, listviaticos, startLoadingViaticosByEmpleado, startGetViaticoByEjercicioOficinaNoviat } = useViaticosStore();
  const { modificarViatico, setModificarViatico } = useUiStore();
  const navigate = useNavigate();

  useEffect(() => {
    startLoadingViaticosByEmpleado(ejercicio, empleado);
  }, [ejercicio, empleado])

  const abrirFormato = (formato: string, oficina: number, ejercicio: number, noViatico: number): void => {
    console.log("abrirFormato", formato, oficina, ejercicio, noViatico);
    const url = `${viaticosApiUrl}api/Viatico/${formato}/${ejercicio}/${oficina}/${noViatico}`;
    
    const element = document.createElement("a");
    element.href = url;
    element.download = "a.pdf";
    element.click();
  }

  const onModificarViatico = (oficina: number, ejercicio: number, noViatico: number): void => {
    modificarViatico();
    setModificarViatico(oficina, ejercicio, noViatico);
    startGetViaticoByEjercicioOficinaNoviat(oficina, ejercicio, noViatico);
    
    navigate("/capturar-viatico");
  }

  // Usar el tipo importado directamente
  const columns: TableColumn<ViaticoListItem>[] = [
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
      selector: row => row.destino,
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
      cell: (row: ViaticoListItem) => row.estatus !== '9' ? 
        <UncontrolledDropdown size="sm" direction="down">
          <DropdownToggle caret className="guinda">
            Formatos
          </DropdownToggle>
          <DropdownMenu container={'body'} style={{ fontSize: 15 }}>
            <DropdownItem onClick={() => abrirFormato("TresFormatos", row.oficina, row.ejercicio, row.viatico)}>
              Formato Completo
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("FormatoComision", row.oficina, row.ejercicio, row.viatico)}>
              Formato Comisión
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("ReciboViatico", row.oficina, row.ejercicio, row.viatico)}>
              Recibo Viatico
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("InformeActividades", row.oficina, row.ejercicio, row.viatico)}>
              Informe
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        :
        <UncontrolledDropdown size="sm" direction="down">
          <DropdownToggle caret className="guinda" disabled>
            Formatos
          </DropdownToggle>
          <DropdownMenu container={'body'} style={{ fontSize: 15 }}>
            <DropdownItem onClick={() => abrirFormato("TresFormatos", row.oficina, row.ejercicio, row.viatico)}>
              Formato Completo
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("FormatoComision", row.oficina, row.ejercicio, row.viatico)}>
              Formato Comisión
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("ReciboViatico", row.oficina, row.ejercicio, row.viatico)}>
              Recibo Viatico
            </DropdownItem>
            <DropdownItem onClick={() => abrirFormato("InformeActividades", row.oficina, row.ejercicio, row.viatico)}>
              Informe
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
    },
    {
      center: true,
      name: 'Editar',
      cell: (row: ViaticoListItem) => (
        <Button 
          className="guinda" 
          color="secondary" 
          disabled={Number(row.estatus) > 1}  
          size="sm" 
          onClick={() => onModificarViatico(row.oficina, row.ejercicio, row.viatico)}
        >
          ✎
        </Button>
      )
    },
    { 
      name: 'Salida',
      selector: row => moment(row.salida).format('DD/MM/YYYY'),
      sortable: true,
      compact: true,
    },
    { 
      name: 'Regreso',
      selector: row => moment(row.regreso).format('DD/MM/YYYY'),
      sortable: true,
      compact: true,
    },
    { 
      name: 'Estatus',
      selector: row => {
        switch (row.estatus) {
          case '1': return 'Creado';
          case '2': return 'Pagado de C.C';
          case '3': return 'Registrado en Cont.';
          case '4': return 'Pagado en Cont.';
          case '9': return 'Cancelado';
          default: return '';
        }
      },
      sortable: true,
      wrap: true,
    }
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '50px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '4px',
        paddingRight: '4px',
      },
    },
  };

  const paginacionOpciones = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  };

  return (
    <div className="">
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={listviaticos}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        className="posicion2"
      />
    </div>
  )
}