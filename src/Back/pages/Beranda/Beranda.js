import React from 'react'
import { useState, useEffect } from 'react'
import { globalLink, language } from '../../../Axios/link'
import Ayat from './Ayat'
import Surah from './Surah'

const Beranda = () => {
    const [surah, setSurah] = useState([])

    useEffect(() => {
        fetchSurah() // eslint-disable-next-line
    }, [])

    async function fetchSurah() {
        const res = await globalLink.get(`/chapters?language=${language}`)
        setSurah(res.data.chapters)
        console.log('surah')
    }

    return (
        <div>
            <Surah surah={surah} />
            <Ayat surah={surah} />
        </div>
    )
}

export default Beranda
