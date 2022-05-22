import React from 'react'
import { useState, useEffect } from 'react'
import { link, globalLink, language } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

const Surah = () => {
    const [surah, setSurah] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdSurah] = useState(2)
    const [refresh, setRefresh] = useState(Math.random)
    const [gambar, setGambar] = useState('')
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        fetchSurah()
    }, [])

    useEffect(() => {
        getVisual() // eslint-disable-next-line
    }, [refresh]) 

    async function fetchSurah() {
        const res = await globalLink.get(`/chapters?language=${language}`)
        setSurah(res.data.chapters)
        console.log('surah')
    }

    async function getVisual() {
        const res = await link.get('surah/' + id)
        setGambar(res.data.gambar)  
        setValue('kata_kunci', res.data.kata_kunci)
        setValue('narasi', res.data.narasi)
        setValue('uraian', res.data.uraian)
        console.log('visual')
    }

    async function simpan(data) {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('kata_kunci', data.kata_kunci)
        formData.append('narasi', data.narasi)
        formData.append('uraian', data.uraian)
        formData.append('gambar', data.gambar[0])
        formData.append('gambar_surah', gambar)
        formData.append('id_session', sessionStorage.getItem('id'))

        if (gambar === undefined) {
            const res = await link.post('/surah', formData)
            setPesan(res.data.message)
        } else {
            const res = await link.post('/surah/'+id, formData)
            setPesan(res.data.message)
        }
        setRefresh(Math.random)
        reset()
    }

    function getVisualSurah(e) {
        setIdSurah(e.value)
        setRefresh(Math.random)
    }

    async function hapus() {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/surah/' + id)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
        }
    }

    return (
        <div>
            <div className="row">{pesan}</div>
            <div className="row">
                <Select
                    onChange={getVisualSurah.bind(this)}
                    options={
                        surah.map(srh => ({
                            value: srh.id, label: srh.name_simple
                        }))
                    }
                />
                <form onSubmit={handleSubmit(simpan)}>
                    <div className="mb-3">
                        <label htmlFor="kata_kunci" className="form-label">kata kunci</label>
                        <input type="text" className="form-control" id="kata_kunci" {...register("kata_kunci", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="narasi" className="form-label">narasi</label>
                        <input type="text" className="form-control" id="narasi" {...register("narasi", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="uraian" className="form-label">uraian</label>
                        <input type="text" className="form-control" id="uraian" {...register("uraian", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">gambar</label>
                        <input type="file" className="form-control" id="gambar" {...register("gambar")} />
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
                {
                    gambar !== undefined ? <img src={gambar} alt="" /> : ''
                }
                <input onClick={() => hapus()} className="btn btn-danger" type="submit" value="HAPUS" />
            </div>
        </div>
    )
}

export default Surah
