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
        <div className="mb-3">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link to={`${url}/beranda`} className="navbar-brand">Maxy Memorizing</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className='fa fa-bars' />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to={`${url}/beranda`} className="nav-link">Beranda</Link></li>
                            <li className="nav-item"><Link to={`${url}/surah`} className="nav-link">Surah</Link></li>
                            <li className="nav-item"><Link to={`${url}/ayat`} className="nav-link">Ayat</Link></li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Postingan</span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={`${url}/kategori`} className="dropdown-item">Kategori</Link></li>
                                    <li><Link to={`${url}/tema`} className="dropdown-item">Tema</Link></li>
                                    <li><Link to={`${url}/materi`} className="dropdown-item">Materi</Link></li>
                                </ul>
                            </li>
                            {
                                (sessionStorage.getItem('level') === '1') ? <li className="nav-item"><Link to={`${url}/user`} className="nav-link">Administrator</Link></li> : ""
                            }
                        </ul>
                        <div className="d-flex dropdown">
                            <button className="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {sessionStorage.getItem('username')} / {sessionStorage.getItem('level') === "1" ? "Administrator" : "Moderator"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link to={`${url}/profile`} className="dropdown-item">Profile</Link></li> { /* eslint-disable-next-line */}
                                <li><a onClick={hapus} className="dropdown-item">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
