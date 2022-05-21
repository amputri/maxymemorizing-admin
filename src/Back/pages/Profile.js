import React from 'react'
import Useget from '../../Hook/useGet'
import { useForm } from 'react-hook-form'
import { link } from '../../Axios/link'

const Profile = () => {
    const [isi] = Useget('admin/user/' + sessionStorage.getItem('id'))
    const { register, handleSubmit, formState: { errors } } = useForm()
    let no = 1

    async function ubah(data) {
        let user = {
            nama: data.nama,
            username: data.username,
            password: data.password,
            id: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin', user)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(ubah)}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">nama</label>
                    <input type="text" className="form-control" id="nama" value={isi.nama} {...register("nama", { required: true })} />
                    {errors.nama && <span>nama harus diisi</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">username</label>
                    <input type="text" className="form-control" id="username" value={isi.username} {...register("username", { required: true })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default Profile
