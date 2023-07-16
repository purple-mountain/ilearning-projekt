import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import { RequestHandler, Response } from "express";
import { JwtToken, LoginUser, User as UserAuth } from "./types/User"
import { generateKey } from "crypto";

const prisma = new PrismaClient()
const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const cookie = req.cookies
        console.log(cookie)
        const { email, username, name, password }: UserAuth = req.body
        const userExists = await checkUserExists(username)
        if (userExists)
            return res.status(400).json({ error: "User with that username already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email: email,
                name: name
            }
        })
        if (!newUser) {
            res.status(400).json({ error: "Invalid User Data" });
            return;
        }
        const accessToken = generateToken("15m", newUser.id)
        const refreshToken = generateToken("7d", newUser.id, newUser.role)
        sendCookie(res, 'accessToken', accessToken, 15 * 60 * 1000)
        sendCookie(res, 'refreshToken', refreshToken, 7 * 24 * 60 * 60 * 1000)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const { username, password }: LoginUser = req.body
        const user = await checkUserExists(username)
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!(user && passwordCorrect))
            return res.status(401).json({ error: "Invalid username or password" });
        console.log(123)
        const accessToken = generateToken("15m", user.id, user.role)
        const refreshToken = generateToken("7d", user.id)
        sendCookie(res, 'accessToken', accessToken, 15 * 60 * 1000)
        sendCookie(res, 'refreshToken', refreshToken, 7 * 24 * 60 * 60 * 1000)
        res.status(201).json(user)
    } catch (err) {
        console.log('past error')
        next(err)
    }
}

const logoutUser: RequestHandler = (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.json({ message: "Cookie cleared" })
}

const refresh: RequestHandler = async (req, res, next) => {
    try {
        const cookie = req.cookies
        if (!cookie.refreshToken)
            return res.status(401).json("Tokens are not provided")
        const decodedToken = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET) as JwtToken
        if (!decodedToken.id)
            return res.status(401).json({ error: "Token Invalid" })
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })
        const accessToken = generateToken("15m", user.id, user.role)
        sendCookie(res, 'accessToken', accessToken, 15 * 60 * 1000)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

function checkUserExists(username: string) {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

function generateToken(expirationTime: string, id: string, role?: string) {
    const payload = role ? { id, role } : { id }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expirationTime,
    });
}

function sendCookie(res: Response, name: string, data: string, age: number) {
    res.cookie(name, data, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: age
    })
}

export { registerUser, loginUser, logoutUser, refresh }
