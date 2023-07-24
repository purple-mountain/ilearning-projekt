import { api } from "../config/api"

async function getAll({ collectionId }) {
    const { data } = await api.get(`/api/items/${collectionId}`)
    return data
}

async function getOne({ itemId, collectionId }) {
    const { data } = await api.get(`/api/items/${collectionId}/${itemId}`)
    return data
}

async function create({ id, name, description, customFields }) {
    const convertedObject = convertDateFields(customFields)
    const { data } = await api.post(`/api/items/${id}/create`, { name, description, customFields: convertedObject }, { withCredentials: true })
    return data
}

function convertDateFields(customFields) {
    const dateProperties = Object.keys(customFields)
    const convertedObject = { ...customFields };
    dateProperties.forEach((property) => {
        if (customFields[property] && property.startsWith('customDateField')) {
            const dateConverted = new Date(customFields[property])
            convertedObject[property] = dateConverted.toISOString()
        }
    })
    return convertedObject
}

async function remove({ itemId }) {
    await api.delete(`/api/items/delete/${itemId}`, { withCredentials: true })
}

async function update({ name, description, customFields, itemId }) {
    const convertedObject = convertDateFields(customFields)
    const { data } = await api.patch(`/api/items/update/${itemId}`, { name, description, customFields: convertedObject }, { withCredentials: true })
    return data
}

export default {
    create,
    remove,
    update,
    getAll,
    getOne
}
