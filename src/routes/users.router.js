import { Router } from 'express'
import { usersModel } from '../models/users.model.js'
import { createHash, isValidatePassword } from '../utils.js'

const router = Router()

// Gets
router.get('/', async (req, res) => {
  res.render('index')
})

router.get('/login', async (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

// Gets privados
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
  res.render('products')
})

router.get('/logout', async (req, res) => {
  delete req.session.user
  res.redirect('login')
})

// Posts
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).render('login', { error: 'Incomplete values' })

  const user = await usersModel.findOne({ email }, { firstName: 1, lastName: 1, age: 1, password: 1, email: 1 })

  if (!user) return res.status(400).render('login', { error: 'User not found' })
  if (!isValidatePassword(user, password)) {
    return res.status(401).render('login', { error: 'Invalid password' })
  }

  delete user.password
  req.session.user = user
  res.redirect('profile')
})

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body

  if (!firstName || !lastName || !email || !age || !password) {
    return res.status(400).send('Incomplete values')
  }

  const user = await usersModel.create({
    firstName,
    lastName,
    email,
    age,
    password: createHash(password)
  })

  if (!user) res.status(400).send('User not created')
  res.redirect('login')
})

export default router
