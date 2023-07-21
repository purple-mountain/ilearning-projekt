import express from 'express'
import { registerUser, loginUser, logoutUser, refresh, getMe } from '../controllers/authController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/create', registerUser)
router.get('/me', protect, getMe)
router.post('/login', loginUser)
router.get('/logout', protect, logoutUser)
router.get('/refresh', refresh)

export { router }
