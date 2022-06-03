import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { link } from '../../Axios/link'

const Profile = () => {
    const { register, handleSubmit, setValue } = useForm()
    const [pesan, setPesan] = useState('')

    useEffect(() => {
        getIsi() // eslint-disable-next-line
    }, [])

    async function getIsi() {
        setValue('nama', sessionStorage.getItem('nama'))
        setValue('username', sessionStorage.getItem('username'))
        console.log('visual')
    }

    async function ubah(data) {
        let passwordBaru = data.password

        if (data.password_baru !== "") {
            if (data.password_baru !== data.konfirm_password) {
                console.log('konfirmasi password salah')
                return
            }
            passwordBaru = data.password_baru
        }

        let user = {
            nama: data.nama,
            username: data.username,
            username_lama: sessionStorage.getItem('username'),
            password: passwordBaru,
            password_lama: data.password,
            id: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin', user)
        setPesan(res.data.message)

        if (res.status === 200) {
            sessionStorage.setItem('nama', data.nama)
            sessionStorage.setItem('username', data.username)

            window.location.reload()
        }
    }

    return (
        <div>
            <div className="card col-6 mx-auto my-4">
                <div className="card-body">
                    {
                        pesan !== '' ? <div className='bg-info p-2 text-white rounded shadow text-center mb-4'>{pesan}</div> : ''
                    }
                    <form onSubmit={handleSubmit(ubah)}>
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama</label>
                            <input type="text" className="form-control" id="nama" {...register("nama", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_baru" className="form-label">Password Baru</label>
                            <input type="password" className="form-control" id="password_baru" {...register("password_baru")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="konfirm_password" className="form-label">Konfirmasi Password</label>
                            <input type="password" className="form-control" id="konfirm_password" {...register("konfirm_password")} />
                        </div>
                        <div className="mb-3 d-grid">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
