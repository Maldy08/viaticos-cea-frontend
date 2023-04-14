import logo from '../../assets/logo.png';
import '../styles/Header.css';

export const Header = () => {
  return (
    <div className="navbar headercea">
      <div className="navbar-left">
        <img src={ logo } alt="logo" />
      </div>

    </div>
  )
}
