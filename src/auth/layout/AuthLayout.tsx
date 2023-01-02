
import { Footer, Header } from '../../viaticos/components';
import '../styles/AuthLayout.css';

type ModuleProps = {
    children: React.ReactNode
}

export const AuthLayout: React.FunctionComponent<ModuleProps> = ({ children }) => {
  return (
    <div className="AuthLayout">
      <Header/>     

        <div className='container mt-3'>
           { children }
        </div>
        
      <Footer/>
    </div>
  )

}
