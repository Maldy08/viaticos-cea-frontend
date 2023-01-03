import { Navigate, Route, Routes } from "react-router-dom"
import { ViaticosPage, CapturarViaticos } from "../pages"


export const ViaticosRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ViaticosPage /> } />
        <Route path="/capturar-viatico" element={ <CapturarViaticos/>} />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
