import React, { useState, useEffect } from 'react'
import { link, globalLink, language } from '../../Axios/link'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Surah = () => {
    const [surah, setSurah] = useState([])
    const [surahInfo, setSurahInfo] = useState([])
    const [pesan, setPesan] = useState('')
    const [id, setIdSurah] = useState(1)
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

    useEffect(() => {
        fetchSurahInfo() // eslint-disable-next-line
    }, [id])

    async function fetchSurah() {
        const res = await globalLink.get(`/chapters?language=${language}`)
        setSurah(res.data.chapters)
        console.log('surah')
    }

    async function fetchSurahInfo() {
        const res = await globalLink.get(`/chapters/${id}/info?language=${language}`)
        setSurahInfo(res.data.chapter_info)
        console.log('surah info')
    }

    async function getVisual() {
        const res = await link.get('surah/' + id)
        setGambar(res.data.gambar)
        setValue('kata_kunci', res.data.kata_kunci)
        setDataNarasi(res.data.narasi ? res.data.narasi : '')
        setDataUraian(res.data.uraian ? res.data.uraian : '')
        console.log('visual')
    }

    function simpan(data) {
        if (data.gambar[0]) {
            const formData = new FormData()
            formData.append('gambar', data.gambar[0])
            axios.post("https://sihaq.com/maxymemorizing/surah/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(response => {
                    let dataSurah = {
                        id: id,
                        kata_kunci: data.kata_kunci,
                        narasi: dataNarasi,
                        uraian: dataUraian,
                        gambar: response.data.nama,
                        id_session: sessionStorage.getItem('id')
                    }

                    if (gambar === undefined) {
                        const res = link.post('/surah', dataSurah)
                        setPesan(res.data.message)
                    } else {
                        const res = link.put('/surah/', dataSurah)
                        setPesan(res.data.message)
                    }
                })
        } else {
            let dataSurah = {
                id: id,
                kata_kunci: data.kata_kunci,
                narasi: dataNarasi,
                uraian: dataUraian,
                gambar: gambar,
                id_session: sessionStorage.getItem('id')
            }

            const res = link.put('/surah/', dataSurah)
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
            const res = await link.delete('/surah/' + id)
            setPesan(res.data.pesan)
            setRefresh(Math.random)
        }
    }

    return (
        <div>
            <div className="row mx-auto mt-2 mb-4">
                <div className="card col-6 mx-auto">
                    <div className="card-body">
                        {
                            pesan !== '' ? <div className='bg-info p-2 text-white rounded shadow text-center mb-4'>{pesan}</div> : ''
                        }
                        <Select
                            onChange={getVisualSurah.bind(this)}
                            options={
                                surah.map(srh => ({
                                    value: srh.id, label: srh.name_simple
                                }))
                            }
                            placeholder="Pilih Surah"
                        />
                        <form onSubmit={handleSubmit(simpan)}>
                            <div className="my-3">
                                <label htmlFor="kata_kunci" className="form-label">Kata Kunci</label>
                                <input type="text" className="form-control" id="kata_kunci" {...register("kata_kunci", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar" className="form-label">Gambar</label>
                                <input type="file" className="form-control" id="gambar" {...register("gambar")} />
                            </div>
                            <label className="form-label">Narasi Gambar</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={dataNarasi}
                                onBlur={(event, editor) => {
                                    setDataNarasi(editor.getData())
                                }}
                            />
                            <label className="form-label my-3">Uraian Surah</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={dataUraian}
                                onBlur={(event, editor) => {
                                    setDataUraian(editor.getData())
                                }}
                            />
                            <div className="mt-3 d-grid">
                                <input type="submit" className="btn btn-primary" />
                            </div>
                        </form>
                        <input onClick={() => hapus()} className="btn btn-danger" type="submit" value="HAPUS" />
                    </div>
                </div>
                <div className="card col-5 mx-auto">
                    {
                        gambar !== undefined ? <img src={gambar} className="card-img-top mx-auto mt-2" alt="..." /> : <img src={process.env.PUBLIC_URL + '/logo.png'} className="card-img-top mx-auto mt-2" alt="..." />
                    }
                    <div className="card-body text-center">
                        <h5 className="card-title">{surah[id - 1]?.name_simple} / {surah[id - 1]?.name_complex} / {surah[id - 1]?.name_arabic}</h5>
                        <p className="card-text">{surah[id - 1]?.translated_name.name} - {surah[id - 1]?.verses_count} ayat</p>
                        <p className="card-text">diturunkan ke-{surah[id - 1]?.revelation_order} di {surah[id - 1]?.revelation_place}</p>
                        <hr />
                        <p className="card-text">{surahInfo.short_text}</p>
                        <p className="card-text fst-italic">({surahInfo.source})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Surah
