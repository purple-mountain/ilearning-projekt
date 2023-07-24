import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { Item } from "./types/Item";
import { CustomReq } from "./types/CustomReq";

const prisma = new PrismaClient()

const getAllItems: RequestHandler = async (req, res, next) => {
    try {
        const { collectionId } = req.params
        const collection = await prisma.collection.findUnique({
            where: { id: collectionId },
            include: {
                items: true
            }
        })
        res.status(200).json(collection.items)
    } catch (err) {
        next(err)
    }
}

const getItem: RequestHandler = async (req, res, next) => {
    try {
        const { itemId } = req.params
        const item = await prisma.item.findUnique({
            where: { id: itemId },
            include: {
                collection: {
                    select: {
                        authorId: true
                    }
                }
            }
        })
        res.status(200).json(item)
    } catch (err) {
        next(err)
    }

}

const createItem: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { name, description, customFields }: Item = req.body
        const { collectionId } = req.params
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId
            }
        })
        if (collection.authorId !== req.user && req.role !== 'ADMIN')
            return res.status(400).json({ error: "Unauthorized access" })
        const newItem = await prisma.item.create({
            data: {
                name: name,
                description: description,
                collection: {
                    connect: {
                        id: collectionId
                    }
                },
                ...customFields
            }
        })
        res.status(201).json(newItem)
    } catch (err) {
        next(err)
    }

}

const updateItem: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { name, description, customFields }: Item = req.body
        const { id } = req.params
        const updatedItem = await prisma.item.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                ...customFields
            }
        })
        res.status(200).json(updatedItem)
    } catch (err) {
        next(err)
    }
}

const deleteItem: RequestHandler = async (req, res, next) => {
    try {
        const { itemId } = req.params
        await prisma.item.delete({
            where: { id: itemId }
        })
        res.status(204).json({ message: "Item has been deteled successfully" })
    } catch (err) {
        next(err)
    }
}

export { getAllItems, createItem, updateItem, deleteItem, getItem }
