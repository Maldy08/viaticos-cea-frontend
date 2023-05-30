import { ViaticosLayout } from "../../viaticos/layout/ViaticosLayout"
import '../../viaticos/styles/Loading.css'


export const Loading = () => {
  return (

      <div className="container px-4">
        <div className="loading">
          <div className="loader">
            <div className="spinner-grow m-5" role="status">
              <span className="loader"></span>
            </div>
          </div>
        </div>
      </div>

  )
}
