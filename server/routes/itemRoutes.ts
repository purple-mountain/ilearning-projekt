import express from 'express'
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../controllers/itemController"
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/:collectionId', getAllItems)
router.post('/:collectionId/create', protect, createItem)
router.patch('/update/:id', protect, updateItem)
router.delete('/delete/:itemId', protect, deleteItem)
router.get('/:collectionId/:itemId', getItem)

export { router }
