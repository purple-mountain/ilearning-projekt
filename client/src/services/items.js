import { api } from "../config/api"

async function getAll({ collectionId }) {
    const { data } = await api.get(`/api/collections/items/${collectionId}`)
    return data
}

async function getOne(collectionId, itemId) {
    const { data } = await api.get(`/api/collections/items/${collectionId}/${itemId}`)
    return data
}

async function create({ id, name, description, customFields }) {
    const convertedObject = convertDateFields(customFields)
    const { data } = await api.post(`/api/collections/items/${id}/create`, { name, description, customFields: convertedObject }, { withCredentials: true })
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

function remove() {

}

async function update() {

}

export default {
    create,
    remove,
    update,
    getAll,
    getOne
}
