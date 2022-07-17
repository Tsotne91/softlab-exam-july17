import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3040",
    timeout: 5000
    })

api.interceptors.request.use(function (config){
    config.headers["Authorization"] = localStorage.token;
    return config;
})

export default api;