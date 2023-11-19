import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useState } from 'react'

const Header = props => {
  const [headerState, setHeaderState] = useState({ openLogoutModal: false });
  const navigate = useNavigate();
  
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/", { replace: true });
  }

  return (
  <nav className="home-navbar">
      <div className="website_logo">
        {window.location.pathname === '/jobs' ? <button
          className="ham-button"
          onClick={() => props.toggleSideNav(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24"><path fill="none" stroke="white"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 17h14M5 12h14M5 7h14" /></svg>
        </button> : null}
        <Link to="/home" className="link_items">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="w-100"
          />
        </Link>
      </div>
      <ul className="header-list-items">
        <Link to="/home" className="link_items">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link_items">
          <li>Jobs</li>
        </Link>
      </ul>
      <ul className="header-sm-list-items">
        <Link to="/home" className="link_items">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24"><path fill="white" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.385h-3.616V20H5Z" /
            ></svg></li>
        </Link>
        <Link to="/jobs" className="link_items">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 16 16"><g fill="white">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
              <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" /></g></svg>
          </li>
        </Link>
        <li>
          <button onClick={() => setHeaderState({openLogoutModal: true})}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="white" d="M11.25 19a.75.75 0 0 1 .75-.75h6a.25.25 0 0 0 .25-.25V6a.25.25 0 0 0-.25-.25h-6a.75.75 0 0 1 0-1.5h6c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 18 19.75h-6a.75.75 0 0 1-.75-.75Z" />
              <path fill="white" d="M15.612 13.115a1 1 0 0 1-1 1H9.756c-.023.356-.052.71-.086 1.066l-.03.305a.718.718 0 0 1-1.025.578a16.844 16.844 0 0 1-4.885-3.539l-.03-.031a.721.721 0 0 1 0-.998l.03-.031a16.843 16.843 0 0 1 4.885-3.539a.718.718 0 0 1 1.025.578l.03.305c.034.355.063.71.086 1.066h4.856a1 1 0 0 1 1 1v2.24Z" /></svg>
          </button></li>
      </ul>
      <button type="button" className="btn btn-primary logout-btn" onClick={() => setHeaderState({openLogoutModal: true})}>
        Logout
      </button>
      {headerState.openLogoutModal ? <div className="logout-container">
        <div className="logout-modal-content">
          <h4>Are you sure, you want to logout ?</h4>
          <div>
            <button className="btn btn-danger mx-2" onClick={() => setHeaderState({openLogoutModal: false})}>NO</button>
            <button className="btn btn-primary mx-2" onClick={onClickLogout}>YES</button>
          </div>
        </div>
      </div> : null}
    </nav>
  )
}

export default Header;
