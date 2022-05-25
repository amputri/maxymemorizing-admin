import React from 'react'
import { useState, useEffect } from 'react'
import { link, globalLink, language, wordFields, translations } from '../../Axios/link'
import { Link } from 'react-router-dom'

const Beranda = () => {
    const [surah, setSurah] = useState([])
    const [ayat, setAyat] = useState([])
    const [visualSurah, setVisualSurah] = useState([])
    const [visualAyat, setVisualAyat] = useState([])
    let noSurah = 1
    let noAyat = 1

    useEffect(() => {
        getVisualSurah()
        getVisualAyat()
        fetchSurah() // eslint-disable-next-line
    }, [])

    async function getVisualSurah() {
        const res = await link.get('surah')
        setVisualSurah(res.data)
        console.log('visual surah')
    }

    async function getVisualAyat() {
        const res = await link.get('ayat')
        setVisualAyat(res.data)
        getAyatWithVisual(res.data)
        console.log('visual ayat')
    }

    async function fetchSurah() {
        const res = await globalLink.get(`/chapters?language=${language}`)
        setSurah(res.data.chapters)
        console.log('surah')
    }

    async function fetchAyat(id) {
        const res = await globalLink.get(`/verses/by_key/${id}?language=${language}&words=true&translations=${translations}&word_fields=${wordFields}`)
        return res.data.verse
    }

    async function getAyatWithVisual(visualAyat) {
        const withVisual = await Promise.all(visualAyat.map(visualAyat => fetchAyat(visualAyat.id)))
        setAyat(withVisual)
        console.log('ambil ayat sesuai visual tersedia')
    }

    return (
        <div>
            <div className="row">
                <div>
                    <h2>Menu Surah</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nomor Surah</th>
                                <th>Nama Surah</th>
                                <th>Kata Kunci</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visualSurah.map((val, index) => (
                                <tr key={index}>
                                <td>{noSurah++}</td>
                                <td>{val.id}</td>
                                <td>{surah[val.id-1].name_simple}</td>
                                <td>{val.kata_kunci}</td>
                                <td>{
                                    <Link to={{
                                        pathname: "/admin/surah",
                                        state: { idFromBeranda: val.id }
                                      }} replace className="btn btn-info">Detail</Link>
                                }</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div>
                    <h2>Menu Ayat</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nomor Surah</th>
                                <th>Nama Surah</th>
                                <th>Nomor Ayat</th>
                                <th>Terjemah Ayat</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visualAyat.map((val, index) => (
                                
                                <tr key={index}>
                                <td>{noAyat++}</td>
                                <td>{val.id.split(':')[0]}</td>
                                <td>{surah[val.id.split(':')[0]-1].name_simple}</td>
                                <td>{val.id.split(':')[1]}</td>
                                <td>{ayat[index]?.translations[0].text}</td>
                                <td>{
                                    <Link to={{
                                        pathname: "/admin/ayat",
                                        state: { idFromBeranda: val.id, jumlahAyat: surah[val.id.split(':')[0]-1].verses_count }
                                      }} replace className="btn btn-info">Detail</Link>
                                }</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Beranda
