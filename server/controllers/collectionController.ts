import { PrismaClient } from '@prisma/client'
import { Request, RequestHandler } from 'express'
import { Collection, CustomFieldsName } from './types/Collection'
import { CustomReq } from './types/CustomReq'

const prisma = new PrismaClient()

const getAllCollections: RequestHandler = async (req, res) => {
    const collections = await prisma.collection.findMany()
    res.status(200).json(collections)
}

const getBiggestCollections: RequestHandler = async (req, res) => {
    const biggestCollections = await prisma.collection.findMany({
        take: 5,
        orderBy: {
            items: {
                _count: "desc"
            }
        },
    })
    res.status(200).json(biggestCollections)
}

const getCollection: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const collection = await prisma.collection.findUnique({
            where: { id: id }
        })
        res.status(200).json(collection)
    } catch (err) {
        next(err)
    }
}

const createCollection: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { name, description, topicName, customFieldsName }: Collection = req.body
        const authorId = req.user
        const newCollection = await prisma.collection.create({
            data: {
                name: name,
                description: description,
                author: {
                    connect: { id: authorId }
                },
                topic: {
                    connect: { name: topicName }
                },
                ...customFieldsName
            }
        })
        res.status(201).json(newCollection)
    } catch (err) {
        next(err)
    }
}

const editCollection: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { name, description, topicName, id }: Collection = req.body
        const collection = await prisma.collection.findUnique({
            where: {
                id: id
            }
        })
        if (collection.authorId !== req.user && req.role !== 'ADMIN')
            return res.status(201).json({ error: "Unauthorized access" })
        const updatedCollection = await prisma.collection.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                topic: { connect: { name: topicName } }
            },
        })
        res.status(201).json(updatedCollection)
    }
    catch (err) {
        next(err)
    }
}

const deleteCollection: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { id }: { id: string } = req.body
        const collection = await prisma.collection.findUnique({
            where: {
                id: id
            }
        })
        if (collection.authorId !== req.user && req.role !== 'ADMIN')
            return res.status(201).json({ error: "Unauthorized access" })
        const deletedCollection = await prisma.collection.delete({
            where: {
                id: id
            }
        })
        res.status(204).json(deletedCollection.id)
    } catch (err) {
        next(err)
    }
}

const createTopic: RequestHandler = async (req, res, next) => {
    try {
        const { name }: { name: string } = req.body
        const newTopic = await prisma.topic.create({
            data: {
                name: name
            }
        })
        res.status(201).json(newTopic)
    } catch (err) {
        next(err)
    }
}

export { getAllCollections, createCollection, editCollection, deleteCollection, createTopic, getCollection, getBiggestCollections }
