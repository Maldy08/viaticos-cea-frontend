import { ViaticosLayout } from "../layout/ViaticosLayout"
import { useDeptosStore } from '../../hooks/useDeptosStore';
import { useEffect } from "react";


export const Departamentos = () => {
  const { deptos, startLoadingDeptos, isLoadingDeptos } = useDeptosStore();

  useEffect(() => {
    startLoadingDeptos();
  }, [])
  

  return (
    <ViaticosLayout>
        <div className="deptos-page">
            <h3>Departamentos</h3>
            <hr />

            <div className="container px-4">
                <div className="row gx-4">
                  <div className="col">
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
                            JSON.stringify(deptos)
                              // deptos.map( depto => (
                              //   <tr key={ depto.id }>
                              //       <td>{ depto.id }</td>
                              //       <td>{ depto.idCea }</td>
                              //       <td>{ depto.idShpoa }</td>
                              //       <td>{ depto.descripcion }</td>
                              //       <td>{ depto.prog }</td>
                              //   </tr>
                              // )) 
                          }
                        </tbody>

                    </table>
                  </div>
                </div>

            </div>
        </div>
         

    </ViaticosLayout>
  )
}


// {
//   isLoadingDeptos? <span>Cargando...</span> : 
//    deptos.map( depto => (
//      <div key={ depto.id }>
//          <span>{ depto.idCea }</span>
//          <span>{ depto.descripcion}</span>
//      </div>
//    ))
// }