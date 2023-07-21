import express from 'express'
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../controllers/itemController"
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/:id', getAllItems)
router.post('/:id/create', protect, createItem)
router.patch('/update', protect, updateItem)
router.delete('/delete', protect, deleteItem)
//router.get('/:id1/:id2', getItem)

export { router }
