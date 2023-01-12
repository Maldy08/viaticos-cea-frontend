import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useAuthStore } from "../hooks";
import { ViaticosRoutes } from "../viaticos/routes/ViaticosRoutes";
import { Loading } from "../ui";

export const AppRouter = () => {

   const { status, checkAuthToken } = useAuthStore();
   
   useEffect(() => {
      checkAuthToken();
   }, [])
   
   if( status === 'checking' ) {
      return <Loading />
   }

  return (
   <Routes>
       {
          ( status === 'authenticated' )
          ? <Route path="/*" element={ <ViaticosRoutes /> } />
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
       } 

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
   </Routes>
  )
}
