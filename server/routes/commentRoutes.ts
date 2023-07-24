import express from 'express'
import { createComment, getComments } from "../controllers/commentController"
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/:itemId/create', protect, createComment)
router.get('/:itemId', getComments)

export { router }
