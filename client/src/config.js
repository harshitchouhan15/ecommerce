
import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL : 'https://snaptly-9dd63c8cecea.herokuapp.com/api'
})