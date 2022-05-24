import React from 'react'
import { useState, useEffect } from 'react'
import { link, globalLink, language } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Surah = () => {
    const location = useLocation()

    const [surah, setSurah] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdSurah] = useState(location.state?.idFromBeranda ? location.state?.idFromBeranda : 1)
    const [refresh, setRefresh] = useState(Math.random)
    const [gambar, setGambar] = useState('')
    const [dataNarasi, setDataNarasi] = useState('')
    const [dataUraian, setDataUraian] = useState('')
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
        setDataNarasi(res.data.narasi ? res.data.narasi : '')
        setDataUraian(res.data.uraian ? res.data.uraian : '')
        console.log('visual')
    }

    async function simpan(data) {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('kata_kunci', data.kata_kunci)
        formData.append('narasi', dataNarasi)
        formData.append('uraian', dataUraian)
        formData.append('gambar', data.gambar[0])
        formData.append('gambar_surah', gambar)
        formData.append('id_session', sessionStorage.getItem('id'))

        if (gambar === undefined) {
            const res = await link.post('/surah', formData)
            setPesan(res.data.message)
        } else {
            const res = await link.post('/surah/' + id, formData)
            setPesan(res.data.message)
        }
        reset()
        setDataNarasi('')
        setDataUraian('')
        setRefresh(Math.random)
        
    }

    function getVisualSurah(e) {
        setIdSurah(e.value)
        setRefresh(Math.random)
    }

    async function hapus() {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/surah/' + id + '/' + gambar.split('/surah/').pop())
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
                        <label htmlFor="gambar" className="form-label">gambar</label>
                        <input type="file" className="form-control" id="gambar" {...register("gambar")} />
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={dataNarasi}
                        onBlur={(event, editor) => {
                            setDataNarasi(editor.getData())
                        }}
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        data={dataUraian}
                        onBlur={(event, editor) => {
                            setDataUraian(editor.getData())
                        }}
                    />
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
