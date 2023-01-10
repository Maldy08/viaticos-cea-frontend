import { Navigate, Route, Routes } from "react-router-dom"
import { ViaticosPage, CapturarViaticos } from "../pages"
import { Departamentos } from "../pages/Departamentos"


export const ViaticosRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ViaticosPage /> } />
        <Route path="/capturar-viatico" element={ <CapturarViaticos/>} />
        <Route path="/deptos" element={ <Departamentos/> }/>
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
