import { ViaticosLayout } from "../layout/ViaticosLayout"
import { TableDeptos } from "../components";


export const Departamentos = () => {

  return (
    <ViaticosLayout>
        <div className="deptos-page">
            <h3>Departamentos</h3>
            <hr />

            <div className="container px-4">
                <div className="row gx-4">
                  <div className="col">
                      <TableDeptos/>
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