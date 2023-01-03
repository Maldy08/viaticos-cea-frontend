import { Header, Footer } from "../components"
import { SeleccionarEjercicio } from "../components/SeleccionarEjercicio"
import { SideBar } from "../components/SideBar"

type ModuleProps = {
  children: React.ReactNode
}

export const ViaticosLayout: React.FunctionComponent<ModuleProps> = ({ children }) => {
  return (
    <div className="main">
      <Header/>
      <SideBar/>
        <div className='page-content p-5'>
         
          { children }

        </div>
      <Footer/>
    </div>
  )
}
