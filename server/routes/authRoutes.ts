import express from 'express'
import { registerUser, loginUser, logoutUser, refresh, getMe, getAll, remove, addAdmin, removeAdmin } from '../controllers/authController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/create', registerUser)
router.get('/me', protect, getMe)
router.get('/', protect, getAll)
router.post('/login', loginUser)
router.get('/logout', protect, logoutUser)
router.get('/refresh', refresh)
router.delete('/:id', protect, remove)
router.patch('/admin/add', protect, addAdmin)
router.patch('/admin/remove', protect, removeAdmin)

export { router }
