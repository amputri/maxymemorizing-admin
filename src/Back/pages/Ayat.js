import React from 'react'
import { useState, useEffect } from 'react'
import { link, globalLink, language, wordFields } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'

const Ayat = () => {
    const location = useLocation()

    const [surah, setSurah] = useState([])
    const [ayat, setAyat] = useState([])
    const [options, setOptions] = useState([])
    const [specSurah, setSpecSurah] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdSurah] = useState(location.state?.idFromBeranda ? location.state?.idFromBeranda.split(':')[0] : 1)
    const [nomor, setNomorAyat] = useState(location.state?.idFromBeranda ? location.state?.idFromBeranda.split(':')[1] : 1)
    const [refresh, setRefresh] = useState(Math.random)
    const [gambar, setGambar] = useState('')
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        fetchSurah()
        setOptionsSelect(location.state?.jumlahAyat ? location.state?.jumlahAyat : 7) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchAyat() // eslint-disable-next-line
    }, [id, nomor]) 

    useEffect(() => {
        getVisual() // eslint-disable-next-line
    }, [refresh]) 

    async function fetchSurah() {
        const res = await globalLink.get(`/chapters?language=${language}`)
        setSurah(res.data.chapters)
        setSpecSurah(location.state?.idFromBeranda ? res.data.chapters[location.state?.idFromBeranda.split(':')[0]-1] : res.data.chapters[0])
        console.log('surah')
    }

    async function fetchAyat() {
        const res = await globalLink.get(`/verses/by_key/${id}:${nomor}?language=${language}&words=true&word_fields=${wordFields}`)
        setAyat(res.data.verse)
        console.log('ayat')
    }

    async function getVisual() {
        const res = await link.get(`ayat/${id}:${nomor}`)
        setGambar(res.data.gambar)  
        console.log('visual')
    }

    async function simpan(data) {
        const formData = new FormData()
        formData.append('id', `${id}:${nomor}`)
        formData.append('gambar', data.gambar[0])
        formData.append('gambar_lama', gambar)
        formData.append('id_session', sessionStorage.getItem('id'))

        if (gambar === undefined) {
            const res = await link.post('/ayat', formData)
            setPesan(res.data.message)
        } else {
            const res = await link.post(`/ayat/${id}:${nomor}`, formData)
            setPesan(res.data.message)
        }
        setRefresh(Math.random)
        reset()
    }

    function getVisualSurah(e) {
        setIdSurah(e.value)
        setSpecSurah(e.data)
        setNomorAyat(1)
        setOptionsSelect(e.data.verses_count)
        setRefresh(Math.random)
    }

    function getVisualAyat(e) {
        setNomorAyat(e.value)
        setRefresh(Math.random)
    }

    async function hapus() {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete(`/ayat/${id}:${nomor}/${gambar.split('/ayat/').pop()}`)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
        }
    }

    function setOptionsSelect(versesCount) {
        var obj = []
        for(var i = 1; i <= versesCount; i++) {
            obj.push({value:i, label: i});
        }
        setOptions(obj)
    }

    return (
        <div>
            <div className="row">{pesan}</div>
            <div className="row">{
                specSurah.revelation_place && ayat.juz_number ? specSurah.revelation_place+ayat.juz_number : ''
            }</div>
            <div className="row">
                <Select
                    onChange={getVisualSurah.bind(this)}
                    options={
                        surah.map(srh => ({
                            value: srh.id, label: srh.name_simple, data:srh
                        }))
                    }
                />
                <Select
                    onChange={getVisualAyat.bind(this)}
                    options={options}
                />
                <form onSubmit={handleSubmit(simpan)}>
                    <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">gambar</label>
                        <input type="file" className="form-control" id="gambar" {...register("gambar", { required: true })} />
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

export default Ayat
