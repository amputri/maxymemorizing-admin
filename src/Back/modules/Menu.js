import Useget from '../../Hook/useGet';
import Usedelete from '../../Hook/useDelete';
import { useForm } from 'react-hook-form';
import React from 'react';
import { useState, useEffect } from 'react';
import { link } from '../../Axios/link';

const Menu = () => {
    const [isi] = Useget('/menu')
    const { hapus, pesan, setPesan } = Usedelete('/menu/')

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    const [kategori, setKategori] = useState([]);
    const [gambar, setGambar] = useState([]);
    const [idKategori, setIdKategori] = useState([]);

    const [id, setIdMenu] = useState('');
    const [pilihan, setPilihan] = useState(true);

    useEffect(() => {
        let ambil = true

        async function fetchData() {
            const res = await link.get('/kategori')
            if (ambil) {
                setKategori(res.data)
            }
        }

        fetchData()

        return () => {
            ambil = false
        };
    }, [kategori]);

    async function simpan(data) {
        const formData = new FormData()
        formData.append('idkategori', data.idkategori)
        formData.append('menu', data.menu)
        formData.append('harga', data.harga)
        formData.append('gambar', data.gambar[0])

        if (pilihan) {
            const res = await link.post('/menu', formData);
            setPesan(res.data.pesan);
        } else {
            const res = await link.post('/menu/' + id, formData);
            setPesan(res.data.pesan);
            setPilihan(true);
        }

        reset()
    }

    async function showData(id) {
        const res = await link.get('/menu/' + id);
        setValue('menu', res.data[0].menu);
        setValue('harga', res.data[0].harga);
        setGambar(<img src={res.data[0].gambar} alt="" height="200" width="250" />);
        setIdKategori(res.data[0].idkategori);
        setIdMenu(id);
        setPilihan(false);
    }

    let no = 1

    return (
        <div>
            <div className="row">
                <h2>Data Menu</h2>
            </div>

            <div className="row">
                <p>{pesan}</p>
            </div>

            <div className="row">
                <div>
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">kategori</label>
                            <select name="idkategori" className="form-control" {...register("idkategori", { required: true })}>
                                {
                                    kategori.map((val, index) =>
                                        val.idkategori === idKategori ? (
                                            <option key={index} selected value={val.idkategori}>
                                                {val.kategori}
                                            </option>
                                        ) : (
                                            <option key={index} value={val.idkategori}>
                                                {val.kategori}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="menu" className="form-label">menu</label>
                            <input type="text" className="form-control" id="menu" placeholder="menu" {...register("menu", { required: true })} />
                            {errors.menu && <span>This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="harga" className="form-label">harga</label>
                            <input type="text" className="form-control" id="harga" placeholder="harga" {...register("harga", { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">gambar</label>
                            <input type="file" className="form-control" id="gambar" {...register("gambar")} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div className="col-4">
                    {gambar}
                </div>
            </div>

            <div className="row">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Menu</th>
                            <th>Gambar</th>
                            <th>Harga</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((val, index) => (
                            <tr key={index}>
                                <td>{no++}</td>
                                <td>{val.kategori}</td>
                                <td>{val.menu}</td>
                                <td><img src={val.gambar} height="100" width="150" alt="" /></td>
                                <td>{val.harga}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={
                                        () => hapus(val.idmenu)
                                    }>Hapus</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={
                                        () => showData(val.idmenu)
                                    }>Ubah</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Menu;
