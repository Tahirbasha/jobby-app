import Cookies from 'js-cookie'
import { Link, useNavigate} from 'react-router-dom'
import './index.css'

const Header = props => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/login", {replace: true});
  }

  return (
    <nav className="home-navbar">
      <div className="website_logo">
        <Link to="/" className="link_items">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="w-100"
          />
        </Link>
      </div>
      <ul className="header-list-items">
        <Link to="/" className="link_items">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link_items">
          <li>Jobs</li>
        </Link>
      </ul>
        <button type="button" className="btn btn-primary logout-btn" onClick={onClickLogout}>
          Logout
        </button>
    </nav>
  )
}

export default Header;
