import express from 'express'
import { createCollection, createTopic, deleteCollection, editCollection, getAllCollections, getCollection } from "../controllers/collectionController"
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', getAllCollections)
router.get('/:id', getCollection)
router.post('/create', protect, createCollection)
router.patch('/update', protect, editCollection)
router.delete('/delete', protect, deleteCollection)
router.post('/topic', protect, createTopic)

export { router }
