import React, { useState } from 'react';
import Useget from '../../Hook/useGet';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { link } from '../../Axios/link';

const User = () => {
    const [isi] = Useget('user')

    let no = 1

    const [mopen, setMopen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    function tambah() {
        setMopen(true)
    }

    async function simpan(data) {
        let user = {
            email: data.email,
            password: data.password,
            level: data.level,
            relasi: 'back'
        }

        const res = await link.post('/register', user)
        setMopen(false)
    }

    async function statuss(id) {
        const data = isi.filter((val)=>val.id === id)

        let stat = 0
        if (data[0].status === 1) {
            stat = 0
        } else {
            stat = 1
        }

        let kirim = {
            status: stat
        }

        const res = await link.put('/user/'+id, kirim)
    }

    return (
        <div>
            <Modal isOpen={mopen} onRequestClose={() => setMopen(false)} style={
                {
                    overlay: {
                        background: 'transparent !important'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40%'
                    }
                }
            }>
                <div className="row">
                    <div className='ml-2'>
                        <h2>Input Data User</h2>
                    </div>
                </div>
                <div className="row">
                    <div className='ml-2 col'>
                        <form onSubmit={handleSubmit(simpan)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">email</label>
                                <input type="email" className="form-control" id="email" placeholder="email" {...register("email", { required: true })} />
                                {errors.email && <span>email harus diisi</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">password</label>
                                <input type="password" className="form-control" id="password" placeholder="password" {...register("password", { required: true })} />
                                <label htmlFor="posisi">Posisi</label>
                                <select className="form-control" name="level" id="level" {...register("level", { required: true })}>
                                    <option value="admin">admin</option>
                                    <option value="kasir">kasir</option>
                                    <option value="koki">koki</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="row">
                <div>
                    <h2>Menu User</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <input onClick={() => (tambah())} className="btn btn-primary" type="submit" value="Tambah" />
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User</th>
                                <th>Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.email}</td>
                                    <td>{val.level}</td>
                                    <td>{
                                        val.status === 1 ? <input onClick={()=>statuss(val.id)} className="btn btn-success" type="submit" value="AKTIF" /> : <input onClick={()=>statuss(val.id)} className="btn btn-danger" type="submit" value="BANNED" />
                                    }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User;
