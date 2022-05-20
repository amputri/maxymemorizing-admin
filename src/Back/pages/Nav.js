import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Nav = () => {
    const history = useHistory()

    function hapus() {
        sessionStorage.clear()
        history.push('/login')
    }

    return (
        <div className="mt-2 mb-2">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <Link to="/admin">
                    <a className="navbar-brand">Dashboard</a>
                </Link>
                <li className="nav-item list-unstyled">Email : {sessionStorage.getItem('email')}</li>
                <li className="nav-item list-unstyled">Posisi : {sessionStorage.getItem('level')}</li>
                <button onClick={hapus} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>

            </nav>

        </div>
    );
}

export default Nav;
