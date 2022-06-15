import React, { useState, useEffect } from 'react'
import { link, globalLink, language, wordFields, translations } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import axios from 'axios'

const Ayat = () => {
    const [surah, setSurah] = useState([])
    const [ayat, setAyat] = useState([])
    const [options, setOptions] = useState([])
    const [specSurah, setSpecSurah] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdSurah] = useState(1)
    const [nomor, setNomorAyat] = useState(1)
    const [refresh, setRefresh] = useState(Math.random)
    const [gambar, setGambar] = useState('')
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        fetchSurah()
        setOptionsSelect(7)
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
        setSpecSurah(res.data.chapters[0])
        console.log('surah')
    }

    async function fetchAyat() {
        const res = await globalLink.get(`/verses/by_key/${id}:${nomor}?language=${language}&words=true&translations=${translations}&word_fields=${wordFields}`)
        setAyat(res.data.verse)
        console.log('ayat')
    }

    async function getVisual() {
        const res = await link.get(`ayat/${id}:${nomor}`)
        setGambar(res.data.gambar)
        console.log('visual')
    }

    function simpan(data) {
        const formData = new FormData()
        formData.append('gambar', data.gambar[0])
        axios.post("https://sihaq.com/maxymemorizing/ayat/upload.php", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => {
                let dataAyat = {
                    id: `${id}:${nomor}`,
                    gambar: response.data.nama,
                    id_session: sessionStorage.getItem('id')
                }

                if (gambar === undefined) {
                    const res = link.post('/ayat', dataAyat)
                    setPesan(res.data.message)
                } else {
                    const res = link.put(`/ayat`, dataAyat)
                    setPesan(res.data.message)
                }
            })
        
        reset()
        setRefresh(Math.random)
        getVisual()
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
            const res = await link.delete(`/ayat/${id}:${nomor}`)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
        }
    }

    function setOptionsSelect(versesCount) {
        var obj = []
        for (var i = 1; i <= versesCount; i++) {
            obj.push({ value: i, label: i });
        }
        setOptions(obj)
    }

    return (
        <div>
            <div className="row mx-auto mt-2 mb-4">
                <div className="card col-4 mx-auto">
                    <div className="card-body">
                        {
                            pesan !== '' ? <div className='bg-info p-2 text-white rounded shadow text-center mb-4'>{pesan}</div> : ''
                        }
                        <Select
                            onChange={getVisualSurah.bind(this)}
                            options={
                                surah.map(srh => ({
                                    value: srh.id, label: srh.name_simple, data: srh
                                }))
                            }
                            placeholder="Pilih Surah"
                        />
                        <Select
                            onChange={getVisualAyat.bind(this)}
                            options={options}
                            placeholder="Pilih Ayat"
                            className='my-3'
                        />
                        <form onSubmit={handleSubmit(simpan)}>
                            <div>
                                <label htmlFor="gambar" className="form-label">gambar</label>
                                <input type="file" className="form-control" id="gambar" {...register("gambar", { required: true })} />
                            </div>
                            <div className="my-3 d-grid">
                                <input type="submit" className="btn btn-primary" />
                            </div>
                        </form>
                        <input onClick={() => hapus()} className="btn btn-danger" type="submit" value="HAPUS" />
                    </div>
                </div>
                <div className="card col-7 mx-auto">
                    {
                        gambar !== undefined ? <img src={gambar} className="mx-auto mt-2" width="50%" alt="..." /> : <img src={process.env.PUBLIC_URL + '/logo.png'} className="mx-auto mt-2" width="50%" alt="..." />
                    }
                    <div className="card-body text-center">
                        <h5 className="card-title">{specSurah.name_simple} ({specSurah.verses_count}) : {nomor}</h5>
                        <p>
                            {ayat.words?.map((value, index) => (
                                <span key={index}>{value.text_uthmani} </span>
                            ))}
                        </p>
                        <hr />
                        <p className="card-text">
                            {ayat.translations?.map((value, index) => (
                                <span key={index}>{value.text} </span>
                            ))}
                        </p>
                        <p className="card-text fst-italic">(Juz {ayat.juz_number})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ayat
