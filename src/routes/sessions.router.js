import { Router } from 'express'
import { usersModel } from '../models/users.model.js'
import { createHash, isValidatePassword } from '../utils.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).render('login', { error: 'Incomplete values' })

  const user = await usersModel.findOne({ email }, { firstName: 1, lastName: 1, age: 1, password: 1, email: 1 })

  if (!user) return res.status(400).render('login', { error: 'User not found' })
  if (!isValidatePassword(user, password)) {
    return res.status(401).render('login', { error: 'Invalid password' })
  }

  delete user.password
  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    user.isAdmin = true
  } else {
    user.isAdmin = false
  }
  req.session.user = user
  res.redirect('http://localhost:8080/products')
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
  res.redirect('http://localhost:8080/login')
})

export default router
