import { Link } from "react-router-dom"
import Logo from '../assets/Reedur.png'

function Header() {
  return (
    <div className="header">
        <Link to={'/'}>
            <h1 className='homepage-logo'>
              <img className="logo" src={Logo} alt="logo" />
            </h1>
        </Link>
    </div>
  )
}

export default Header