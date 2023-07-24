import { api } from "../config/api"

async function getAllCollections() {
    const { data } = await api.get('/api/collections')
    return data
}

async function getBiggestCollections() {
    const { data } = await api.get(`/api/collections/biggest`)
    return data
}

async function getCollection(id) {
    const { data } = await api.get(`/api/collections/${id}`)
    return data
}

async function create({ name, description, topicName, customFieldsName }) {
    const { data } = await api.post('/api/collections/create', { name, description, topicName, customFieldsName }, { withCredentials: true })
    return data
}

function remove() {

}

async function update() {

}

export default {
    create,
    remove,
    update,
    getAllCollections,
    getCollection,
    getBiggestCollections
}
