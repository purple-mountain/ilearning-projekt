import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'
import { Request, RequestHandler } from "express";
import { JwtToken } from "../types/jwtToken";

interface CustomRequest extends Request {
  user?: string;
  role?: string;
}

const prisma = new PrismaClient()
const protect: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const { accessToken } = req.cookies
        console.log('access token ---- ' + accessToken)
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
