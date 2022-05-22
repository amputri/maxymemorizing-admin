import React from 'react'
import { useParams } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Surah from './pages/Surah'
import Ayat from './pages/Ayat'
import User from './pages/User'
import Profile from './pages/Profile'

const Content = () => {
    const { isi } = useParams()

    let tampil

    if (isi === 'beranda') {
        tampil = <Beranda />
    }
    if (isi === 'surah') {
        tampil = <Surah />
    }
    if (isi === 'ayat') {
        tampil = <Ayat />
    }
    if (isi === 'user' && sessionStorage.getItem('level') === '1') {
        tampil = <User />
    }
    if (isi === 'profile') {
        tampil = <Profile />
    }

    return (
        <>
            {tampil}
        </>
    )
}

export default Content
