import { useEffect } from "react";
import { useDeptosStore } from "../../hooks/useDeptosStore";

export const TableDeptos = () => {

    const { deptos, startLoadingDeptos, isLoadingDeptos } = useDeptosStore();

    useEffect(() => {
      startLoadingDeptos();
    }, [])
    
  return (
    <table className="table table-sm table-bordered">
        <thead>
            <tr>
            <th>Id</th>
            <th>Depto</th>
            <th>IdPoa</th>
            <th>Descripcion</th>
            <th>Programa</th>
            </tr>
        </thead>
        <tbody>
        { isLoadingDeptos ? <tr><th scope="row">Cargando....</th></tr> 
            :
        
            deptos.map( depto => (
                <tr key={ depto.id }>
                    <td>{ depto.id }</td>
                    <td>{ depto.idCea }</td>
                    <td>{ depto.idShpoa }</td>
                    <td>{ depto.descripcion }</td>
                    <td>{ depto.prog }</td>
                </tr>
            )) 
        }
        </tbody>

    </table>
  )
}
