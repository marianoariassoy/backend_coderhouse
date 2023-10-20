import { Router } from 'express'
import { getAllUsers, register, login, deleteUser, github, githubCallback } from '../controllers/users.controller.js'
import passport from 'passport'
const router = Router()

router.get('/', getAllUsers)
router.post('/register', register)
router.post('/login', login)

router.delete('/:uid', deleteUser)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), github)
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)

export default router
