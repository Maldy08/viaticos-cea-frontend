import { SideBar, Header, Footer } from "../components"

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
