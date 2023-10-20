import { Router } from 'express'
import { get, getById, create, edit, deleteById } from '../controllers/products.controller.js'

const router = Router()

router.get('/', get)
router.get('/:pid', getById)
router.post('/', create)
router.put('/:pid', edit)
router.delete('/:pid', deleteById)

export default router
