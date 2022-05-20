import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';

const Detail = () => {
    let today = new Date().toISOString().slice(0,10)

    const [awal, setAwal] = useState(today);
    const [akhir, setAkhir] = useState(today);

    const [isi] = Useget(`/detail/${awal}/${akhir}`)

    let no = 1

    const { register, handleSubmit } = useForm();

    function cari(data) {
        setAwal(data.tawal)
        setAkhir(data.takhir)
    }

    return (
        <div>
            <div className="row">
                <div>
                    <h2>Detail Penjualan</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <form onSubmit={handleSubmit(cari)}>
                        <div className="mb-3">
                            <label htmlFor="tawal" className="form-label">tanggal awal</label>
                            <input type="date" className="form-control" id="tawal" {...register("tawal")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="takhir" className="form-label">tanggal akhir</label>
                            <input type="date" className="form-control" id="takhir" {...register("takhir")} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Faktur</th>
                                <th>Tanggal Order</th>
                                <th>Menu</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isi.map((val, index) => (
                                    <tr key={index}>
                                        <td>{no++}</td>
                                        <td>{val.idorder}</td>
                                        <td>{val.tglorder}</td>
                                        <td>{val.menu}</td>
                                        <td>{val.hargajual}</td>
                                        <td>{val.jumlah}</td>
                                        <td>{val.hargajual * val.jumlah}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
