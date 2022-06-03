import React from 'react'
import { link } from '../Axios/link'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit, reset } = useForm()

    const history = useHistory()

    async function login(data) {
        const res = await link.post('/login', data)
        let token = await res.data.token

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('id', res.data.data.id)
        sessionStorage.setItem('nama', res.data.data.nama)
        sessionStorage.setItem('username', res.data.data.username)
        sessionStorage.setItem('level', res.data.data.level)

        reset()

        if (getToken() !== 'undefined') {
            history.push('/admin/beranda')
            window.location.reload()
        }
    }

    const getToken = () => (sessionStorage.getItem('token'))

    return (
        <div>
            <div className="row mt-5">
                <div className="mx-auto col-4">
                    <div className="card">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} className="img-fluid mx-auto" alt="" width="70%" />
                        <div className="card-body">
                            <form onSubmit={handleSubmit(login)}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id='username' placeholder='Username' name="username" {...register("username", { required: true })} />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id='password' placeholder='Password' name="password" {...register("password", { required: true })} />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
