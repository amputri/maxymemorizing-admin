import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'

const Nav = () => {
    const history = useHistory()
    const { url } = useRouteMatch()

    function hapus() {
        sessionStorage.clear()
        history.push('/login')
    }

    return (
        <div className="mt-2 mb-2">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <li className="nav-item list-unstyled">Email : {sessionStorage.getItem('username')}</li>
                <li className="nav-item list-unstyled">Posisi : {sessionStorage.getItem('level')}</li>
                <li className="nav-item list-unstyled">
                    <Link to={`${url}/profile`}>Profile</Link>
                </li>
                <button onClick={hapus} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>

            </nav>

        </div>
    )
}

export default Nav
