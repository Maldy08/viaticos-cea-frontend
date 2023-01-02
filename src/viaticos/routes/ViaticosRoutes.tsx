import { Navigate, Route, Routes } from "react-router-dom"
import { ViaticosPage } from "../pages/ViaticosPage"


export const ViaticosRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ViaticosPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
