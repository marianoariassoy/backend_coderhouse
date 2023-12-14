import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { get, getById, create, deleteById, premium, uploadDocument } from '../controllers/users.controller.js'
import { upload } from '../utils.js'
const router = Router()

router.get('/', get)
router.get('/:uid', getById)
router.post('/register', create)
router.delete('/:uid', passportCall('jwt'), authorization(), deleteById)

router.get('/premium/:uid', premium)
router.post('/:uid/documents', passportCall('jwt'), upload.single('file'), uploadDocument)

export default router
