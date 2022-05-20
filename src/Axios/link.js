import axios from 'axios'

const url = "http://localhost:3333";
let token = sessionStorage.getItem('token')

export const link = axios.create({
    baseURL: url,
    headers: {
        'x-access-token': token
    }
})
