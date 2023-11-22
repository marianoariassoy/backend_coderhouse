import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { get, getById, create, deleteById } from '../controllers/users.controller.js'
import { forgotpassword, resetpassword, verifyToken } from '../controllers/forgotpassword.controller.js'
const router = Router()

router.get('/', get)
router.get('/:uid', getById)
router.post('/register', create)
router.delete('/:uid', passportCall('jwt'), authorization(), deleteById)

router.post('/forgot-password', forgotpassword)
router.get('/reset-password/:id/:token', verifyToken)
router.post('/reset-password/:id/:token', resetpassword)

export default router
