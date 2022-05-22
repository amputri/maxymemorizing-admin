import axios from 'axios'

const url = "http://localhost:3333"
let token = sessionStorage.getItem('token')

export const link = axios.create({
    baseURL: url,
    headers: {
        'x-access-token': token
    }
})

const globalUrl = "https://api.quran.com/api/v4"
export const globalLink = axios.create({
    baseURL: globalUrl
})

export const language = "id"
export const wordFields = "text_uthmani"