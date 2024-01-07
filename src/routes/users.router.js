import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import usersController from '../controllers/users.controller.js'
import { upload } from '../utils.js'
const router = Router()

router.get('/', usersController.getAllUsers)
router.delete('/', usersController.deleteInactiveUsers)
router.put('/:uid', usersController.updateUser)

router.get('/:uid', usersController.getUserById)
router.post('/register', usersController.createUser)
router.delete('/:uid', passportCall('jwt-header'), authorization('admin'), usersController.deleteUserById)

router.get('/premium/:uid', usersController.premium)
router.post('/:uid/documents', passportCall('jwt'), upload.single('file'), usersController.uploadDocument)

export default router
