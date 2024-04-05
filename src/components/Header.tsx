import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="header">
        <Link to={'/'}>
            <h1 className='homepage-logo'>React Reader</h1>
        </Link>
    </div>
  )
}

export default Header