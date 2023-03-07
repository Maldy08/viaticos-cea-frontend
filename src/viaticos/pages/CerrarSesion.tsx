import { useEffect } from "react";
import { useAuthStore, useViaticosStore } from "../../hooks";


export const CerrarSesion = () => {
    const { startLogOut, status } = useAuthStore();
    const { startResetData } = useViaticosStore();
    useEffect( ()  => {
       setTimeout( () => {
           startResetData();
           startLogOut();
           
       },2000);
    }, []);
    return (
      <>
          <div className="container">
              <div className="row d-flex justify-content-center">
                  <div className="col-md-6">
                      <h3>Cerrando Sesión....</h3>
                  </div>
              </div>
          </div>
      </>
    );
}