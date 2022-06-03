import React from 'react'

const Beranda = () => {
    return (
        <div className='container'>
            <div className="card my-4">
                <h5 className="card-header">Surah</h5>
                <div className="card-body">
                    <h5 className="card-title">Olah Data Surah</h5>
                    <p className="card-text">Input visualisasi, narasi, dan kandungan surah.</p>
                </div>
            </div>
            <div className="card">
                <h5 className="card-header">Ayat</h5>
                <div className="card-body">
                    <h5 className="card-title">Olah Data Ayat</h5>
                    <p className="card-text">Input visualisasi ayat.</p>
                </div>
            </div>
            <div className="card my-4">
                <h5 className="card-header">Postingan</h5>
                <div className="card-body">
                    <h5 className="card-title">Olah Data Postingan</h5>
                    <p className="card-text">Input kategori, tema, dan materi terkait ayat.</p>
                </div>
            </div>
            <div className="card my-4">
                <h5 className="card-header">Profile</h5>
                <div className="card-body">
                    <h5 className="card-title">Olah Data Profile</h5>
                    <p className="card-text">Ubah nama, username, atau password.</p>
                </div>
            </div>
            {
                (sessionStorage.getItem('level') === '1') ?
                    <div className="card my-4">
                        <h5 className="card-header">Administrator</h5>
                        <div className="card-body">
                            <h5 className="card-title">Olah Data Admin</h5>
                            <p className="card-text">Input admin baru, ubah level, status, reset password, dan hapus data invalid.</p>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}

export default Beranda
