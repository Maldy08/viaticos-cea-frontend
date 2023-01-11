import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useAuthStore, useCheckAuth } from "../hooks";
import { ViaticosRoutes } from "../viaticos/routes/ViaticosRoutes";

export const AppRouter = () => {

   const { status, checkAuthToken } = useAuthStore();

   useEffect(() => {
      checkAuthToken();
   }, [])
   

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
