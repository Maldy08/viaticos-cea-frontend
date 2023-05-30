import { useEffect } from "react";
import { useAuthStore, useViaticosStore } from "../../hooks";
import '../styles/CerrarSesion.css';
import '../../viaticos/styles/Loading.css'
import { Loading } from "../../ui";


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
        <div className="cerrar">
          <Loading/>
        </div>
    );
}