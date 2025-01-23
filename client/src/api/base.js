import axios from "axios";

const SERVER_BASE_URL = "https://snapshare-avzz.onrender.com/api/"

const SERVER_DEV_BASE_URL = "http://localhost:5555/api"

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: SERVER_DEV_BASE_URL,
    withCredentials: true
})

export { api }