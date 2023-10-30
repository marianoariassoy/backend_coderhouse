import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { get, getById, create, deleteById } from '../controllers/users.controller.js'
const router = Router()

router.get('/', get)
router.get('/:uid', getById)
router.post('/register', create)
router.delete('/:uid', passportCall('jwt'), authorization('admin'), deleteById)

export default router
