import express from 'express'
import { registerUser, loginUser, logoutUser, refresh } from '../controllers/authController'

const router = express.Router()

router.post('/create', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/refresh', refresh)

export { router }
