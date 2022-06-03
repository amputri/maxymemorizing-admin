import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { link } from '../../Axios/link'
import { MDBDataTable } from 'mdbreact'

const User = () => {
    const [isi, setIsi] = useState([])
    const [pesan, setPesan] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    let nomor = 1

    useEffect(() => {
        getIsi()
    }, [refresh])

    async function getIsi() {
        const res = await link.get(`admin/${sessionStorage.getItem('id')}`)
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
        <div className='container'>
            <div className="accordion mb-4" id="accordionExample">
                <div className="accordion-item mb-4">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Input Data User
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {
                                pesan !== '' ? <div className='bg-info p-2 text-white rounded shadow text-center mb-4'>{pesan}</div> : ''
                            }
                            <form onSubmit={handleSubmit(simpan)}>
                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">Nama</label>
                                    <input type="text" className="form-control" id="nama" {...register("nama", { required: true })} />
                                    {errors.nama && <span>nama harus diisi</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                                </div><div className="mb-3">
                                    <label htmlFor="level">Level</label>
                                    <select className="form-control" name="level" id="level" {...register("level", { required: true })}>
                                        <option value="1">Administrator</option>
                                        <option value="2">Moderator</option>
                                    </select>
                                </div>
                                <div className="mb-3 d-grid">
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <h5 className="card-title">Data User</h5>
                    <hr />
                    <MDBDataTable
                        borderless
                        small
                        data={{
                            columns: [
                                { label: 'No', field: 'nomor' },
                                { label: 'Nama', field: 'nama' },
                                { label: 'Username', field: 'username' },
                                { label: 'Level', field: 'level' },
                                { label: 'Status', field: 'status' },
                                { label: 'Reset Password', field: 'resetPassword' },
                                { label: 'Hapus', field: 'hapus' }
                            ],
                            rows: isi.map((val) => ({
                                nomor: nomor++,
                                nama: val.nama,
                                username: val.username,
                                level: val.level === 1 ? <span onClick={() => ubahLevel(val.id, 2)} className="text-small bg-primary text-white rounded px-2 py-1">administrator</span> : <span onClick={() => ubahLevel(val.id, 1)} className="text-small bg-info text-white rounded px-2 py-1">moderator</span>,
                                status: val.status === 1 ? <span onClick={() => ubahStatus(val.id, 0)} className="text-small bg-success text-white rounded px-2 py-1">aktif</span> : <span onClick={() => ubahStatus(val.id, 1)} className="text-small bg-danger text-white rounded px-2 py-1">banned</span>,
                                resetPassword: <i onClick={() => resetPassword(val.id)} className="fa fa-recycle text-warning" />,
                                hapus: <i onClick={() => hapus(val.id)} className="fa fa-trash text-danger" />
                            }))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default User
