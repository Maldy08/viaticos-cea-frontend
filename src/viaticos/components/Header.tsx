import logo from '../../assets/logo.png';
import '../styles/Header.css';
export const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={ logo } alt="logo" />
        {/* <div className='titulo'>Sistema de Control de Viaticos</div> */}
      </div>
    </div>
  )
}
