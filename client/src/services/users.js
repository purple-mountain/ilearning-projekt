import { api } from "../config/api"
import { baseUrl } from "../config/baseUrl"
import axios from "axios"

async function authenticate({ user, action }) {
    const { data } = await axios.post(`${baseUrl}/api/users/${action}`, user, { withCredentials: true })
    return data
}

async function getCurrentUser() {
    try {
        const { data } = await api.get('/api/users/me', { withCredentials: true })
        return data
    } catch (err) {
        return { name: "Guest" }
    }
}

async function logout() {
    await axios.get(`${baseUrl}/api/users/logout`, { withCredentials: true })
}

async function refresh() {
    const { data } = await axios.get(`${baseUrl}/api/users/refresh`, { withCredentials: true })
    return data
}

async function remove() {

}

export default {
    authenticate,
    getCurrentUser,
    remove,
    logout,
    refresh
}
