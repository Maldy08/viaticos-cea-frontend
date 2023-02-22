import { useEffect } from "react";
import { useAuthStore } from "../../hooks";


export const CerrarSesion = () => {
    const { startLogOut, status } = useAuthStore();
    useEffect( ()  => {
       setTimeout( () => {
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