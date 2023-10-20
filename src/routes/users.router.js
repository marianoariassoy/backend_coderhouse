import { Router } from 'express'
import { get, getById, create, deleteById } from '../controllers/users.controller.js'
const router = Router()

router.get('/', get)
router.get('/:uid', getById)
router.post('/register', create)
router.delete('/:uid', deleteById)

export default router
