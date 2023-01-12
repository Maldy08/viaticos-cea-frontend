import { ViaticosLayout } from "../../viaticos/layout/ViaticosLayout"


export const Loading = () => {
  return (

      <div className="container px-4">
        <div className="row gx-4">
          <div className="col">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  )
}
