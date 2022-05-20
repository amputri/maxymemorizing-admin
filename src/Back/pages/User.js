import React, { useState } from 'react';
import Useget from '../../Hook/useGet';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { link } from '../../Axios/link';

const User = () => {
    const [isi] = Useget('admin/' + sessionStorage.getItem('id'))

    let no = 1

    const [mopen, setMopen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    function tambah() {
        setMopen(true)
    }

    async function simpan(data) {
        let user = {
            nama: data.nama,
            username: data.username,
            level: data.level,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.post('/admin', user)
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
            status: stat,
            id: id,
            id_session: sessionStorage.getItem('id')
        }

        const res = await link.put('/admin/status/', kirim)
    }

    return (
        <div>
            <Modal ariaHideApp={false} isOpen={mopen} onRequestClose={() => setMopen(false)} style={
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
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.nama}</td>
                                    <td>{val.username}</td>
                                    <td>{
                                        val.level === 1 ? <span>Administrator</span> : <span>Moderator</span>
                                    }</td>
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
