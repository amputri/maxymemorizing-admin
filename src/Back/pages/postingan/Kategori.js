import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { link, pokokOptions } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const Kategori = () => {
    const [pesan, setPesan] = useState('')
    const [kategori, setKategori] = useState([])
    const [pokok, setPokok] = useState(1)
    const [idKategori, setIdKategori] = useState(0)
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        fetchKategori() // eslint-disable-next-line
    }, [pokok, refresh])

    async function fetchKategori() {
        const res = await link.get(`kategori/${pokok}`)
        setKategori(res.data)
        console.log('kategori')
    }

    function getKategori(e) {
        setPokok(e.value)
    }

    async function simpan(data) {
        let kategori = {
            pokok: pokok,
            urutan: data.urutan,
            kategori: data.kategori,
            id: idKategori,
            id_session: sessionStorage.getItem('id')
        }

        let res
        idKategori === 0 ? res = await link.post('/kategori', kategori) : res = await link.put('/kategori', kategori)

        setPesan(res.data.message)
        setRefresh(Math.random)
        setIdKategori(0)
        reset()
    }

    function showData(data) {
        setValue('urutan', data.urutan)
        setValue('kategori', data.kategori)
        setIdKategori(data.id)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/kategori/' + id)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
            reset()
            setIdKategori(0)
        }
    }

    return (
        <div className='container'>
            <div className="row mx-auto mt-2 mb-4">
                <div className="accordion mb-4" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Input Kategori Postingan
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {
                                    pesan !== '' ? <div className='bg-info p-2 text-white rounded shadow text-center mb-4'>{pesan}</div> : ''
                                }
                                <label className="form-label mb-3">Pokok Materi</label>
                                <Select
                                    onChange={getKategori.bind(this)}
                                    options={pokokOptions}
                                    defaultValue={pokokOptions[0]}
                                />
                                <form onSubmit={handleSubmit(simpan)}>
                                    <div className="my-3">
                                        <label htmlFor="urutan" className="form-label">urutan</label>
                                        <input type="number" className="form-control" id="urutan" {...register("urutan", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="kategori" className="form-label">kategori</label>
                                        <input type="text" className="form-control" id="kategori" {...register("kategori", { required: true })} />
                                    </div>
                                    <div className="d-grid">
                                        <input type="submit" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="card-title">Data Kategori Postingan</h5>
                    <hr />
                    <MDBDataTable
                        borderless
                        small
                        data={{
                            columns: [
                                { label: 'Nomor', field: 'nomor' },
                                { label: 'Kategori', field: 'kategori' },
                                { label: 'Editor', field: 'editor' },
                                { label: 'Tanggal', field: 'tanggal' },
                                { label: 'Ubah', field: 'ubah' },
                                { label: 'Hapus', field: 'hapus' },
                                { label: 'Tema', field: 'tema' }
                            ],
                            rows: kategori.map((val) => ({
                                nomor: val.urutan,
                                kategori: val.kategori,
                                editor: val.update_by,
                                tanggal: val.update_at,
                                ubah: <i onClick={() => showData(val)} className="fa fa-edit text-warning" />,
                                hapus: <i onClick={() => hapus(val.id)} className="fa fa-trash text-danger" />,
                                tema: <Link to={{
                                    pathname: "/admin/tema",
                                    state: { pokok: pokok, idKategori: val.id }
                                }} replace><i className="fa fa-search text-success" /></Link>
                            }))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Kategori
