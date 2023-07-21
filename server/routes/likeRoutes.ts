import express from 'express'
import { likeItem } from "../controllers/likeController"

const router = express.Router()

router.post('/create', likeItem)

export { router }
