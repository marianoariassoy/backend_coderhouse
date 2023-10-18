import { Router } from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct
} from '../controllers/products.controller.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/:pid', getProductById)
router.post('/', createProduct)
router.put('/:pid', editProduct)
router.delete('/:pid', deleteProduct)

export default router
