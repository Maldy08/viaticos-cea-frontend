import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ViaticosRoutes } from "../viaticos/routes/ViaticosRoutes";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {

  const { status } = useAuthStore();

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
