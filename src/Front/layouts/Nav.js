import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="mt-2 mb-2">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <li className="nav-item list-unstyled">Maxy Memorizing</li>
                <li className="nav-item list-unstyled">
                    <Link to={`/login`}>Login</Link>
                </li>
            </nav>

        </div>
    )
}

export default Nav
