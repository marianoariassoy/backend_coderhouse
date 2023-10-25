import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { get, getById, create, edit, deleteById } from '../controllers/products.controller.js'

const router = Router()

router.get('/', get)
router.get('/:pid', getById)
router.post('/', passportCall('jwt'), authorization('admin'), create)
router.put('/:pid', passportCall('jwt'), authorization('admin'), edit)
router.delete('/:pid', passportCall('jwt'), authorization('admin'), deleteById)

export default router
