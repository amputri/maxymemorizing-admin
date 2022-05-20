import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';
import Modal from 'react-modal';
import { link } from '../../Axios/link';

Modal.setAppElement('#root');

const Order = () => {
    let today = new Date().toISOString().slice(0, 10)
    const [awal, setAwal] = useState(today);
    const [akhir, setAkhir] = useState(today);
    const [isi] = Useget(`/order/${awal}/${akhir}`)
    let no = 1

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [mopen, setMopen] = useState(false);
    const [total, setTotal] = useState(0);
    const [pelanggan, setPelanggan] = useState('');
    const [idorder, setIdorder] = useState(0);

    function cari(data) {
        setAwal(data.tawal)
        setAkhir(data.takhir)
    }

    function filterData(id) {
        const data = isi.filter((val) => val.idorder === id)
        setPelanggan(data[0].pelanggan)
        setTotal(data[0].total)
        setIdorder(data[0].idorder)
        setMopen(true)
    }

    function isiForm() {
        setValue("total", total)
    }

    async function simpan(data) {
        let hasil = {
            bayar: data.bayar,
            kembali: data.bayar - data.total,
            status: 1
        }

        const res = await link.put('/order/' + idorder, hasil)
        setMopen(false)
    }

    return (
        <div>
            <Modal isOpen={mopen} onAfterOpen={isiForm} onRequestClose={() => setMopen(false)} style={
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
                    <h2>Pembayaran Order {pelanggan}</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit(simpan)}>
                            <div className="mb-3">
                                <label htmlFor="total" className="form-label">total</label>
                                <input type="number" className="form-control" id="total" {...register("total", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bayar" className="form-label">bayar</label>
                                <input type="number" className="form-control" id="bayar" {...register("bayar", { required: true, min: total })} />
                                {errors.bayar && <span>Pembayaran Kurang !</span>}
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-danger mr-2" value="batal" onClick={() => setMopen(false)} />
                                <input type="submit" className="btn btn-primary" value="bayar" />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="row">
                <div>
                    <h2>Data Order</h2>
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
                                <th>Pelanggan</th>
                                <th>Tanggal Order</th>
                                <th>Total</th>
                                <th>Bayar</th>
                                <th>Kembali</th>
                                <th>ٍStatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isi.map((val, index) => (
                                    <tr key={index}>
                                        <td>{no++}</td>
                                        <td>{val.idorder}</td>
                                        <td>{val.pelanggan}</td>
                                        <td>{val.tglorder}</td>
                                        <td>{val.total}</td>
                                        <td>{val.bayar}</td>
                                        <td>{val.kembali}</td>
                                        <td>
                                            {
                                                val.status === 0 ? <button className="btn btn-danger" onClick={() => filterData(val.idorder)}>belum bayar</button> : <p>lunas</p>
                                            }
                                        </td>
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

export default Order;
