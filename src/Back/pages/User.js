import React from 'react'
import Useget from '../../Hook/useGet'
import { useForm } from 'react-hook-form'
import { link } from '../../Axios/link'

const User = () => {
    const [isi] = Useget('admin/' + sessionStorage.getItem('id'))
    const { register, handleSubmit, formState: { errors } } = useForm()
    let no = 1

    async function simpan(data) {
        let user = {
            nama: data.nama,
            username: data.username,
            level: data.level,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.post('/admin', user)
    }

    async function ubahStatus(id, status) {
        let user = {
            status: status,
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/status/', user)
    }

    async function ubahLevel(id, level) {
        let user = {
            level: level,
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/level/', user)
    }

    async function resetPassword(id) {
        let user = {
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/reset-password/', user)
    }

    async function hapus(id) {
        const res = await link.delete('/admin/' + id)
    }

    return (
        <div>
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
                                    <td>{no++}</td>
                                    <td>{val.nama}</td>
                                    <td>{val.username}</td>
                                    <td>{
                                        val.level === 1 ? <input onClick={() => ubahLevel(val.id, 2)} className="btn btn-success" type="submit" value="ADMINISTRATOR" /> : <input onClick={() => ubahStatus(val.id, 1)} className="btn btn-danger" type="submit" value="MODERATOR" />
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
                </div>
            </div>
        </div>
    )
}

export default User
