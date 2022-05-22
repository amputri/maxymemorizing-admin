import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Side = () => {
    const { url } = useRouteMatch()

    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">
                    Menu Aplikasi
                </div>
                <ul className="list-group list-group-flush">
                    <Link to={`${url}/beranda`}><li className="list-group-item">Beranda</li></Link>
                    <Link to={`${url}/surah`}><li className="list-group-item">Surah</li></Link>
                    <Link to={`${url}/ayat`}><li className="list-group-item">Ayat</li></Link>
                    <Link to={`${url}/user`}>
                        {
                            (sessionStorage.getItem('level') === '1') ? <li className="list-group-item">Administrator</li> : ""
                        }
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Side
