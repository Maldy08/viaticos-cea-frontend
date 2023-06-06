import { Navigate, Route, Routes } from "react-router-dom"
import { Loading } from "../../ui"
import {ViaticosPage, CapturarViaticos, FormatoComision, ReciboViaticos, CerrarSesion, CambiarPass} from "../pages"
import { CapturarViaticosOld } from "../pages/CapturarViaticosOld"
import { Departamentos } from "../pages/Departamentos"
import { InformeActividades } from "../pages/InformeActividades"
import { ListadoViaticos } from "../pages/ListadoViaticos"


export const ViaticosRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={ <ViaticosPage /> } />
        <Route path="/capturar-viatico" element={ <CapturarViaticos/>} />
        <Route path="/capturar-viatico/:oficina/:ejercicio/:noviat" element={ <CapturarViaticos/>} />
        <Route path="/deptos" element={ <Departamentos/>}/>
        <Route path="/listado-viaticos" element={ <ListadoViaticos/> } />
        <Route path="/cambiar-password" element={ <CambiarPass />}/>
        <Route path="/cerrar-sesion" element={ <CerrarSesion/>} />
        <Route path="/formato-comision/:oficina/:ejercicio/:noviat" element={ <FormatoComision/> } />
        <Route path="/recibo-viatico/:oficina/:ejercicio/:noviat" element={ <ReciboViaticos/> } />
        <Route path="/informe-actividades/:oficina/:ejercicio/:noviat" element={< InformeActividades/>} />
        <Route path="loading" element={ <Loading/>} />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )

}
