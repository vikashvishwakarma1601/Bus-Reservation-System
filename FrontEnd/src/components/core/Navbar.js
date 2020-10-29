import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/helper'
import '../stylesheets/style.css'

const Navbar = ({ history }) => {

    const renderMenuItems = () => {
        if (isAuthenticated()) {
            return (<>
                <Link to="/user/ticket-history" className="navBtn">Ticket History</Link>
                <div className="divisionLine"></div>
                <Link to="/" onClick={(e) => logout(() => {
                    history.push('/')
                })} className="navBtn logout">Logout</Link>
            </>)
        }
        else {
            return (<><div className="divisionLine"></div>
                <Link to="/login" className="navBtn">Log in</Link>
                <Link to="/register" className="navBtn">Sign up</Link>
            </>)
        }
    }

    return (
        <nav>
            <div className="header">
                <Link to="/">
                    <div className="logo">
                        <img src="../images/logo.svg" alt="logo" />
                    </div>
                </Link>
                <div className="menu" style={{width: isAuthenticated() ? "360px" : "300px"}}>
                    <Link to="/" className="navBtn">Home</Link>
                    {renderMenuItems()}
                </div>
            </div>
        </nav >
    )
}

export default withRouter(Navbar);