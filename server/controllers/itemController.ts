import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { Item } from "./types/Item";
import { CustomReq } from "./types/CustomReq";

const prisma = new PrismaClient()

const getAllItems: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const collection = await prisma.collection.findUnique({
            where: {id: id},
            include: {
                items: true
            }
        })
        res.status(200).json(collection.items)
    } catch(err) {
        next(err)
    }
}

const getItem: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const item = await prisma.item.findUnique({
            where: { id: id }
        })
        res.status(200).json(item)
    } catch (err) {
        next(err)
    }

}

const createItem: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { name, description, customFields }: Item = req.body
        const { id: collectionId } = req.params
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

const updateItem: RequestHandler = async (req, res, next) => {

}

const deleteItem: RequestHandler = async (req, res, next) => {

}

export { getAllItems, createItem, updateItem, deleteItem, getItem }
