import axios from "axios"

const apiClient = axios.create({
    baseURL:'http://localhost:8082',
    // baseURL:'http://first-aid.std-272.ist.mospolytech.ru',
    withCredentials: false,
    headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 10000
})

export default {
    getAll(route) {
        return apiClient.get(`/${route}`)
    },
    getById(route, id) {
        return apiClient.get(`/${route}/${id}`)
    },
    delete(route, id) {
        return apiClient.delete(`/${route}/${id}`)
    },
    update(route, data) {
        return apiClient.put(`/${route}`, data)
    },
    post(route, data) {
        return apiClient.post(`/${route}`, data)
    }
}