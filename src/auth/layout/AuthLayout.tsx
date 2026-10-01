
import logo from '../../assets/logo.png';
import { Footer } from '../../viaticos/components';
import '../styles/AuthLayout.css';

type ModuleProps = {
    children: React.ReactNode
}

export const AuthLayout: React.FunctionComponent<ModuleProps> = ({ children }) => {
  return (
    <div className="AuthLayout">
      <div className="auth-topbar" aria-hidden="true"></div>
      <main className="auth-main">
        <div className="auth-brand">
          <img src={logo} alt="Comision Estatal del Agua de Baja California" />
          <span></span>
        </div>
        <div className='container auth-container'>
          { children }
        </div>
      </main>
      <Footer/>
    </div>
  )

}
