import React from 'react'
import { Link } from 'react-router-dom'

const Front = () => {
    return (
        <div>
            <div className="mb-4">
                <nav className="navbar py-3 navbar-light bg-light justify-content-between">
                    <li className="nav-item list-unstyled fs-4 fw-bold">Maxy Memorizing</li>
                    <li className="nav-item list-unstyled">
                        <Link to={`/login`} className="btn btn-outline-info">Login</Link>
                    </li>
                </nav>
            </div>
            <div className="card col-6 mx-auto mb-4">
            <img src={process.env.PUBLIC_URL + '/logo.png'} className="card-img-top mx-auto" alt="" width="70%" />
                <div className="card-body">
                    <h5 className="card-title">"Shinning with Qur'an"</h5>
                    <p className="card-text">Aplikasi mobile yang membantu memperkuat hafalan Al-Qur'an melalui visualisasi gambar dan pemetaan, dengan beberapa fitur:</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Fitur Baca Al-Qur'an</li>
                    <li className="list-group-item">Fitur Al-Qur'an Card</li>
                    <li className="list-group-item">Fitur Tes Hafalan</li>
                    <li className="list-group-item">Fitur Pendalaman Ayat dalam Al-Qur'an</li>
                </ul>
            </div>
        </div>
    )
}

export default Front
