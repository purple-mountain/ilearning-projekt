import { PrismaClient } from '@prisma/client'
import { NextFunction, RequestHandler } from 'express'

const prisma = new PrismaClient()
const createCollection: RequestHandler = async (req, res, next) => {
    // get current user
    // createCollection and connect the user
    // return the neccessary data
}

export { createCollection }
