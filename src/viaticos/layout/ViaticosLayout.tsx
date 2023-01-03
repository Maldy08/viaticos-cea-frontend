import { SideBar, Header, Footer } from "../components"
import '../styles/ViaticosLayout.css';

type ModuleProps = {
  children: React.ReactNode
}

export const ViaticosLayout: React.FunctionComponent<ModuleProps> = ({ children }) => {
  return (
    <div className="main">
      <Header/>
      <SideBar/>
        <div className='page-content p-3'>
         
          { children }

        </div>
      <Footer/>
    </div>
  )
}
