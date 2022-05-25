import React from 'react'
import { useState, useEffect } from 'react'
import { link, globalLink, language, wordFields, translations } from '../../../Axios/link'
import { Link } from 'react-router-dom'

const Ayat = (props) => {
    const [ayat, setAyat] = useState([])
    const [visualAyat, setVisualAyat] = useState([])
    
    let [halaman, setHalaman] = useState(1)
    let [halamanAwal, setHalamanAwal] = useState(0)
    let [totalHalaman, setTotalHalaman] = useState()
    let [listPage, setListPage] = useState([])
    let [nomor, setNomor] = useState()

    useEffect(() => {
        countAyat() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setHalamanAwal((halaman * 10) - 10) // eslint-disable-next-line
    }, [halaman])

    useEffect(() => {
        setNomor(halamanAwal + 1)
        getVisualAyat() // eslint-disable-next-line
    }, [halamanAwal])

    async function countAyat() {
        const res = await link.get('ayat')
        setTotalHalaman(Math.ceil(res.data / 10))

        var obj = []
        for(var i = 1; i <= Math.ceil(res.data / 10); i++) {
            obj.push(i);
        }
        setListPage(obj)

        console.log('jumlah Data')
    }

    async function getVisualAyat() {
        const res = await link.get('ayat/all/' + halamanAwal)
        setVisualAyat(res.data)
        getAyatWithVisual(res.data)
        console.log('visual ayat')
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
                                <td>{nomor++} {val.create_at}</td>
                                <td>{val.nomor_surah} {val.create_by}</td>
                                <td>{props.surah[val.nomor_surah-1]?.name_simple} {val.update_at}</td>
                                <td>{val.nomor_ayat} {val.update_by}</td>
                                <td>{ayat[index]?.translations[0].text}</td>
                                <td>{
                                    <Link to={{
                                        pathname: "/admin/ayat",
                                        state: { idFromBeranda: val.id, jumlahAyat: props.surah[val.nomor_surah-1]?.verses_count }
                                      }} replace className="btn btn-info">Detail</Link>
                                }</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {
                                    halaman > 1 ? <input type="submit" className="page-link" onClick={() => setHalaman(halaman-1)} value="previous" /> : ''
                                }
                            </li>
                            {listPage.map((item, index) =>
                                <li key={index + 1} className="page-item"><input type="submit" value={index + 1} className="page-link" onClick={() => setHalaman(index + 1)} /></li>
                            )}
                            <li className="page-item">
                                {
                                    halaman < totalHalaman ? <input type="submit" value="next" className="page-link" onClick={() => setHalaman(halaman+1)} /> : ''
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Ayat
