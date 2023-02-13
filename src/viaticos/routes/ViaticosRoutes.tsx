import { Navigate, Route, Routes } from "react-router-dom"
import {ViaticosPage, CapturarViaticos, FormatoComision, ReciboViaticos, CerrarSesion} from "../pages"
import { CapturarViaticosOld } from "../pages/CapturarViaticosOld"
import { Departamentos } from "../pages/Departamentos"
import { ListadoViaticos } from "../pages/ListadoViaticos"


export const ViaticosRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={ <ViaticosPage /> } />
        <Route path="/capturar-viatico" element={ <CapturarViaticos/>} />
        <Route path="/deptos" element={ <Departamentos/>}/>
        <Route path="/listado-viaticos" element={ <ListadoViaticos/> } />
        <Route path="/cerrar-sesion" element={ <CerrarSesion/>} />
        <Route path="/formato-comision/:oficina/:ejercicio/:noviat" element={ <FormatoComision/> } />
        <Route path="/recibo-viatico/:oficina/:ejercicio/:noviat" element={ <ReciboViaticos/> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )

}
