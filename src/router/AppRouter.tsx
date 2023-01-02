import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ViaticosRoutes } from "../viaticos/routes/ViaticosRoutes";
import { useCheckAuth } from '../hooks/useCheckAuth';


export const AppRouter = () => {

  const status = useCheckAuth();

  return (
   <Routes>
       {
          ( status === 'authenticated' )
          ? <Route path="/*" element={ <ViaticosRoutes /> } />
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
       } 

      <Route path="/*" element={ <Navigate to="/auth/login" />}  />
   </Routes>
  )
}
