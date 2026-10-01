import { SideBar, Header, Footer, EmpleadosModal } from "../components"
import '../styles/ViaticosLayout.css';

type ModuleProps = {
  children: React.ReactNode;
}

export const ViaticosLayout: React.FunctionComponent<ModuleProps> = ({ children }) => {
  return (
    <div className="main">
      <Header/>
      <SideBar/>

        <div className='page-content'>
         
          { children }

        </div>
      <EmpleadosModal/>
      <Footer/>
      
    </div>

    
  )
}
