import { Router } from 'express'
import { login, github, githubCallback, register } from '../controllers/sessions.controller.js'
import passport from 'passport'
const router = Router()

router.post('/login', login)
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), github)
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)
router.post('/register', register)

export default router
