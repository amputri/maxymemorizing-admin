import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { link, pokokOptions } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useLocation } from 'react-router-dom'

const Materi = () => {
    const location = useLocation()

    const [pesan, setPesan] = useState('')
    const [tema, setTema] = useState([])
    const [kategori, setKategori] = useState([])
    const [materi, setMateri] = useState([])
    const [pokok, setPokok] = useState(location.state?.pokok ? location.state.pokok : 1)
    const [idKategori, setIdKategori] = useState(location.state?.idKategori ? location.state.idKategori : 0)
    const [idTema, setIdTema] = useState(location.state?.idTema ? location.state.idTema : 0)
    const [idMateri, setIdMateri] = useState(0)
    const [dataMateri, setDataMateri] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        fetchMateri() // eslint-disable-next-line
    }, [idTema, refresh])

    useEffect(() => {
        fetchTema() // eslint-disable-next-line
    }, [idKategori])

    useEffect(() => {
        fetchKategori() // eslint-disable-next-line
    }, [pokok])

    async function fetchKategori() {
        const res = await link.get(`kategori/${pokok}`)
        setKategori(res.data)
        console.log('kategori')
    }

    async function fetchTema() {
        const res = await link.get(`tema/${idKategori}`)
        setTema(res.data)
        console.log('tema')
    }

    async function fetchMateri() {
        const res = await link.get(`materi/${idTema}`)
        setMateri(res.data)
        console.log('materi')
    }

    function getKategori(e) {
        setPokok(e.value)
    }

    function getTema(e) {
        setIdKategori(e.value)
    }

    function getMateri(e) {
        setIdTema(e.value)
    }

    async function simpan(data) {
        let materi = {
            tema: idTema,
            urutan: data.urutan,
            judul: data.judul,
            materi: dataMateri,
            id: idMateri,
            id_session: sessionStorage.getItem('id')
        }

        let res
        idMateri === 0 ? res = await link.post('/materi', materi) : res = await link.put('/materi', materi)

        setPesan(res.data.message)
        setRefresh(Math.random)
        setIdMateri(0)
        setDataMateri('')
        reset()
    }

    function showData(data) {
        setValue('urutan', data.urutan)
        setValue('judul', data.judul)
        setIdMateri(data.id)
        setDataMateri(data.materi)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/materi/' + id)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
            reset()
            setIdMateri(0)
        }
    }

    return (
        <div>
            <div className="row">{pesan}</div>
            <div className="row">
                <Select
                    onChange={getKategori.bind(this)}
                    options={pokokOptions}
                    defaultValue={pokokOptions[0]}
                />
                <Select
                    onChange={getTema.bind(this)}
                    options={
                        kategori.map(kategori => ({
                            value: kategori.id, label: kategori.kategori
                        }))
                    }
                />
                <Select
                    onChange={getMateri.bind(this)}
                    options={
                        tema.map(tema => ({
                            value: tema.id, label: tema.judul
                        }))
                    }
                />
                <form onSubmit={handleSubmit(simpan)}>
                    <div className="mb-3">
                        <label htmlFor="urutan" className="form-label">urutan</label>
                        <input type="number" className="form-control" id="urutan" {...register("urutan", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="judul" className="form-label">judul</label>
                        <input type="text" className="form-control" id="judul" {...register("judul", { required: true })} />
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={dataMateri}
                        onBlur={(event, editor) => {
                            setDataMateri(editor.getData())
                        }}
                    />
                    <div className="mb-3">
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
                <MDBDataTable
                    borderless
                    small
                    data={{
                        columns: [
                            { label: 'Nomor', field: 'nomor' },
                            { label: 'Judul', field: 'judul' },
                            { label: 'Editor', field: 'editor' },
                            { label: 'Tanggal', field: 'tanggal' },
                            { label: 'Ubah', field: 'ubah' },
                            { label: 'Hapus', field: 'hapus' }
                        ],
                        rows: materi.map((val) => ({
                            nomor: val.urutan,
                            judul: val.judul,
                            editor: val.update_by,
                            tanggal: val.update_at,
                            ubah: <input onClick={() => showData(val)} className="btn btn-success" type="submit" value="Ubah" />,
                            hapus: <input onClick={() => hapus(val.id)} className="btn btn-danger" type="submit" value="Hapus" />
                        }))
                    }}
                />
            </div>
        </div>
    )
}

export default Materi
