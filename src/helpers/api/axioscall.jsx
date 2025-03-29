import { config } from "../../config/config";
const baseurl = config.VITE_BaseUrl
const adminbaseurl = `${config.VITE_BaseUrl}/admin`
import axios from 'axios'


export const axiosApi = (baseURL)=>{
    return axios.create({
        baseURL, 
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    })
}

export const userApi =  axiosApi(baseurl)
export const adminApi =  axiosApi(adminbaseurl)
