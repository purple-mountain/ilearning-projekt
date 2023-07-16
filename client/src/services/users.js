import { baseUrl } from "../config/baseUrl"
import axios from "axios"

async function authenticate(user, action) {
    const { data } = await axios.post(`${baseUrl}/api/users/${action}`, user, { withCredentials: true })
    return data
}

async function logout() {
    console.log(123)
    await axios.get(`${baseUrl}/api/users/logout`)
}

async function refresh() {
    const { data } = await axios.get(`${baseUrl}/api/users/refresh`, { withCredentials: true })
    return data
}

async function remove() {

}

export default {
    authenticate,
    remove,
    logout,
    refresh
}
