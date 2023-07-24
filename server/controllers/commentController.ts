import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { CustomReq } from "./types/CustomReq";

const prisma = new PrismaClient()
const createComment: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { content, parentId }: { content: string, parentId?: string } = req.body
        const { itemId } = req.params
        const authorId = req.user
        const newComment = await prisma.comment.create({
            data: {
                content: content,
                author: {
                    connect: {
                        id: authorId
                    }
                },
                item: {
                    connect: {
                        id: itemId
                    }
                },
                parent: parentId ? {
                    connect: {
                        id: parentId
                    }
                } : undefined
            },
            include: {
                author: true
            }
        })
        res.status(201).json(newComment)
    } catch (err) {
        next(err)
    }
}

const getComments: RequestHandler = async function(req, res, next) {
    try {
        const { itemId } = req.params
        const comments = await prisma.comment.findMany({
            where: {
                itemId: itemId,
                parentId: null 
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                children: {
                    include: {
                        author: true
                    }
                }
            }
        })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}

export { createComment, getComments }
