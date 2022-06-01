import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { link, pokokOptions } from '../../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Link, useLocation } from 'react-router-dom'

const Tema = () => {
    const location = useLocation()

    const [pesan, setPesan] = useState('')
    const [tema, setTema] = useState([])
    const [kategori, setKategori] = useState([])
    const [pokok, setPokok] = useState(location.state?.pokok ? location.state.pokok : 1)
    const [idKategori, setIdKategori] = useState(location.state?.idKategori ? location.state.idKategori : 0)
    const [idTema, setIdTema] = useState(0)
    const [gambar, setGambar] = useState('')
    const [dataReferensi, setDataReferensi] = useState('')
    const [refresh, setRefresh] = useState(Math.random)
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        fetchTema() // eslint-disable-next-line
    }, [idKategori, refresh])

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

    function getKategori(e) {
        setPokok(e.value)
    }

    function getTema(e) {
        setIdKategori(e.value)
    }

    async function simpan(data) {
        const formData = new FormData()
        formData.append('kategori', idKategori)
        formData.append('urutan', data.urutan)
        formData.append('judul', data.judul)
        formData.append('gambar', data.gambar[0])
        formData.append('gambar_tema', gambar)
        formData.append('referensi', dataReferensi)
        formData.append('id_session', sessionStorage.getItem('id'))

        if (gambar === '') {
            const res = await link.post('/tema', formData)
            setPesan(res.data.message)
        } else {
            const res = await link.post('/tema/' + idTema, formData)
            setPesan(res.data.message)
        }

        reset()
        setDataReferensi('')
        setGambar('')
        setRefresh(Math.random)
    }

    function showData(data) {
        setValue('urutan', data.urutan)
        setValue('judul', data.judul)
        setIdTema(data.id)
        setGambar(data.gambar)
        setDataReferensi(data.referensi)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/tema/' + id + '/' + gambar.split('/tema/').pop())
            setPesan(res.data.pesan)
            reset()
            setDataReferensi('')
            setGambar('')
            setRefresh(Math.random)
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
                <form onSubmit={handleSubmit(simpan)}>
                    <div className="mb-3">
                        <label htmlFor="urutan" className="form-label">urutan</label>
                        <input type="number" className="form-control" id="urutan" {...register("urutan", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="judul" className="form-label">judul</label>
                        <input type="text" className="form-control" id="judul" {...register("judul", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">gambar</label>
                        <input type="file" className="form-control" id="gambar" {...register("gambar")} />
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={dataReferensi}
                        onBlur={(event, editor) => {
                            setDataReferensi(editor.getData())
                        }}
                    />
                    {
                        gambar !== '' ? <img src={gambar} alt="" /> : ''
                    }
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
                            { label: 'Hapus', field: 'hapus' },
                            { label: 'Materi', field: 'materi' }
                        ],
                        rows: tema.map((val) => ({
                            nomor: val.urutan,
                            judul: val.judul,
                            editor: val.update_by,
                            tanggal: val.update_at,
                            ubah: <input onClick={() => showData(val)} className="btn btn-success" type="submit" value="Ubah" />,
                            hapus: <input onClick={() => hapus(val.id)} className="btn btn-danger" type="submit" value="Hapus" />,
                            materi: <Link to={{
                                            pathname: "/admin/materi",
                                            state: { pokok: pokok, idKategori: idKategori, idTema: val.id }
                                        }} replace className="btn btn-info">Detail</Link>
                        }))
                    }}
                />
            </div>
        </div>
    )
}

export default Tema
