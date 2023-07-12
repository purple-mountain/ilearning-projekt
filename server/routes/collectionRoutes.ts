import express from 'express'
import { createCollection } from "../controllers/collectionController"

const router = express.Router()

router.post('/create', createCollection)

export { router }
