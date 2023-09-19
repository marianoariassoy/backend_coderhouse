import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  res.render('login')
})

router.get('/login', async (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const { firstName, lastName, email, age } = req.session.user
  res.render('profile', { firstName, lastName, email, age })
})

router.get('/products', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const { firstName, lastName, isAdmin } = req.session.user
  res.render('products', { firstName, lastName, isAdmin })
})

router.get('/logout', async (req, res) => {
  delete req.session.user
  res.redirect('login')
})

export default router
