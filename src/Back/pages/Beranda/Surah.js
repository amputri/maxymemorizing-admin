import React from 'react'
import { useState, useEffect } from 'react'
import { link } from '../../../Axios/link'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact';

const Beranda = (props) => {
    const [visualSurah, setVisualSurah] = useState([])

    let [halaman, setHalaman] = useState(1)
    let [halamanAwal, setHalamanAwal] = useState(0)
    let [totalHalaman, setTotalHalaman] = useState()
    let [listPage, setListPage] = useState([])
    let [nomor, setNomor] = useState()

    useEffect(() => {
        countSurah() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setHalamanAwal((halaman * 10) - 10) // eslint-disable-next-line
    }, [halaman])

    useEffect(() => {
        setNomor(halamanAwal + 1)
        getVisualSurah() // eslint-disable-next-line
    }, [halamanAwal])

    async function countSurah() {
        const res = await link.get('surah')
        setTotalHalaman(Math.ceil(res.data / 10))

        var obj = []
        for (var i = 1; i <= Math.ceil(res.data / 10); i++) {
            obj.push(i);
        }
        setListPage(obj)

        console.log('jumlah Data')
    }

    async function getVisualSurah() {
        const res = await link.get('surah/all/' + halamanAwal)
        setVisualSurah(res.data)
        console.log('visual surah')
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
                                    <td>{nomor++}</td>
                                    <td>{val.id}</td>
                                    <td>{props.surah[val.id - 1]?.name_simple}</td>
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
                    <MDBDataTable
      small
      data={{columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Position',
          field: 'position',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Office',
          field: 'office',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Age',
          field: 'age',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Start date',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Salary',
          field: 'salary',
          sort: 'asc',
          width: 100
        }
      ],
      rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: <button>tes</button>
        }]}}
    />
                </div>
            </div>
        </div>
    )
}

export default Beranda
