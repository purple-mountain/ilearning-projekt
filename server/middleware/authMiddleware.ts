import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'
import { Request, RequestHandler } from "express";
import { JwtToken } from "../types/jwtToken";
import { CustomReq } from "../controllers/types/CustomReq";

const prisma = new PrismaClient()
const protect: RequestHandler = async (req: CustomReq, res, next) => {
    try {
        const { accessToken } = req.cookies
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtToken
        if (!decodedToken.id)
            return res.status(401).json({ error: "Token Invalid" });
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })
        if (!user)
            return res.status(401).json({ error: "Current user does not exist" });
        req.user = decodedToken.id
        req.role = decodedToken.role
        next()
    } catch (err) {
        next(err)
    }
}

export { protect }
