import React from 'react';
import Useget from '../../Hook/useGet';
import Usedelete from '../../Hook/useDelete';

const Pelanggan = () => {
    const [isi] = Useget('/pelanggan')
    const { hapus, pesan } = Usedelete('/pelanggan/')

    let no = 1

    return (
        <div>
            <div className="row">
                <h2>Data Pelanggan</h2>
            </div>
            <div className="row">
                <div>
                    <p>{pesan}</p>
                </div>
            </div>
            <div className="row">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Pelanggan</th>
                            <th>Alamat</th>
                            <th>Telp</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((val, index) => (
                            <tr key={index}>
                                <td>{no++}</td>
                                <td>{val.pelanggan}</td>
                                <td>{val.alamat}</td>
                                <td>{val.telp}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={
                                        () => hapus(val.idpelanggan)
                                    }>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pelanggan;
