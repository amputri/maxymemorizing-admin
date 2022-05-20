import React, { useState } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';

const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [id, setIdKategori] = useState('');
    const [pilihan, setPilihan] = useState(true);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const [isi] = Useget('/kategori')

    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/kategori', data);
            setPesan(res.data.pesan);
        } else {
            const res = await link.put('/kategori/' + id, data);
            setPesan(res.data.pesan);
            setPilihan(true);
        }

        reset();
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/kategori/' + id);
            setPesan(res.data.pesan);
        }
    }

    async function showData(id) {
        const res = await link.get('/kategori/' + id);
        setValue('kategori', res.data[0].kategori);
        setValue('keterangan', res.data[0].keterangan);
        setIdKategori(res.data[0].idkategori);
        setPilihan(false);
    }

    let no = 1;

    return (
        <div>
            <div className="row">
                <h2>Data Kategori</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="row">
                <div className="col-4">
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">kategori</label>
                            <input type="text" className="form-control" id="kategori" placeholder="kategori" {...register("kategori", { required: true })} />
                            {errors.kategori && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label">keterangan</label>
                            <input type="text" className="form-control" id="keterangan" placeholder="keterangan" {...register("keterangan", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Keterangan</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.kategori}</td>
                                    <td>{val.keterangan}</td>
                                    <td>
                                        <button onClick={() => hapus(val.idkategori)} className="btn btn-danger">Hapus</button>
                                    </td>
                                    <td>
                                        <button onClick={() => showData(val.idkategori)} className="btn btn-warning">Ubah</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Kategori;
