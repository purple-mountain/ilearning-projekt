import { api } from "../config/api"

async function create({ itemId, content, parentId = null }) {
    const { data } = await api.post(`/api/comments/${itemId}/create`, { content, parentId }, { withCredentials: true })
    return data
}

async function getAll({ itemId }) {
    const { data } = await api.get(`/api/comments/${itemId}`)
    return data
}

export default { create, getAll }
