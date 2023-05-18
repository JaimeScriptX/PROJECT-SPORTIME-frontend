import axios from "axios";
import { getEnvVariables } from "../helpers";

const {VITE_API_URL} = getEnvVariables()

const sportimeApi = axios.create({
    baseURL: VITE_API_URL

})

sportimeApi.interceptors.request.use( (config:any)  => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default sportimeApi