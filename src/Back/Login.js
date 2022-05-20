import React from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();

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

        if (getToken() != 'undefined') {
            history.push('/admin')
            window.location.reload()
        }
    }

    const getToken = ()=>(sessionStorage.getItem('token'))

    return (
        <div>
            <div className="row mt-5">
                <div className="mx-auto col-4">
                    <form onSubmit={handleSubmit(login)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" name="username" aria-describedby="emailHelp" placeholder="Enter email" {...register("username", { required: true })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" {...register("password", { required: true })} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;
