import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { link } from '../../Axios/link'

const User = () => {
    const [isi, setIsi] = useState([])
    const [pesan, setPesan] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    
    let [halaman, setHalaman] = useState(1)
    let [halamanAwal, setHalamanAwal] = useState(0)
    let [totalHalaman, setTotalHalaman] = useState()
    let [listPage, setListPage] = useState([])
    let [nomor, setNomor] = useState()

    useEffect(() => {
        countUser() // eslint-disable-next-line
    }, [refresh])

    useEffect(() => {
        setHalamanAwal((halaman * 10) - 10) // eslint-disable-next-line
    }, [halaman, refresh])

    useEffect(() => {
        setNomor(halamanAwal + 1)
        getIsi() // eslint-disable-next-line
    }, [halamanAwal, refresh])

    async function countUser() {
        const res = await link.get('admin/' + sessionStorage.getItem('id'))
        setTotalHalaman(Math.ceil(res.data / 10))

        var obj = []
        for (var i = 1; i <= Math.ceil(res.data / 10); i++) {
            obj.push(i);
        }
        setListPage(obj)

        console.log('jumlah Data')
    }

    async function getIsi() {
        const res = await link.get(`admin/${sessionStorage.getItem('id')}/${halamanAwal}`)
        setIsi(res.data)  
        console.log('visual')
    }


    async function simpan(data) {
        let user = {
            nama: data.nama,
            username: data.username,
            level: data.level,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.post('/admin', user)
        setPesan(res.data.message)
        setRefresh(Math.random)
        reset()
    }

    async function ubahStatus(id, status) {
        let user = {
            status: status,
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/status/', user)
        setPesan(res.data.message)
        setRefresh(Math.random)
    }

    async function ubahLevel(id, level) {
        let user = {
            level: level,
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/level/', user)
        setPesan(res.data.message)
        setRefresh(Math.random)
    }

    async function resetPassword(id) {
        let user = {
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/reset-password/', user)
        setPesan(res.data.message)
        setRefresh(Math.random)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/admin/' + id)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
        }
    }

    return (
        <div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Input Data User
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <form onSubmit={handleSubmit(simpan)}>
                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">nama</label>
                                    <input type="text" className="form-control" id="nama" {...register("nama", { required: true })} />
                                    {errors.nama && <span>nama harus diisi</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">username</label>
                                    <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                                    <label htmlFor="level">Level</label>
                                    <select className="form-control" name="level" id="level" {...register("level", { required: true })}>
                                        <option value="1">Administrator</option>
                                        <option value="2">Moderator</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <h2>Menu User</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Level</th>
                                <th>Status</th>
                                <th>Reset Password</th>
                                <th>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{nomor++}</td>
                                    <td>{val.nama}</td>
                                    <td>{val.username}</td>
                                    <td>{
                                        val.level === 1 ? <input onClick={() => ubahLevel(val.id, 2)} className="btn btn-success" type="submit" value="ADMINISTRATOR" /> : <input onClick={() => ubahLevel(val.id, 1)} className="btn btn-danger" type="submit" value="MODERATOR" />
                                    }</td>
                                    <td>{
                                        val.status === 1 ? <input onClick={() => ubahStatus(val.id, 0)} className="btn btn-success" type="submit" value="AKTIF" /> : <input onClick={() => ubahStatus(val.id, 1)} className="btn btn-danger" type="submit" value="BANNED" />
                                    }</td>
                                    <td>{
                                        <input onClick={() => resetPassword(val.id)} className="btn btn-warning" type="submit" value="RESET" />
                                    }</td>
                                    <td>{
                                        <input onClick={() => hapus(val.id)} className="btn btn-danger" type="submit" value="HAPUS" />
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

export default User
