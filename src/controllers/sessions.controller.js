import Sessions from '../dao/classes/sessions.dao.js'
import { createHash, isValidatePassword } from '../utils.js'
const sessionsServices = new Sessions()

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).render('login', { error: 'Incomplete values' })

  const user = sessionsServices.get(email)

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
}

export const github = (req, res) => {
  res.redirect('http://localhost:8080/products')
}

export const githubCallback = (req, res) => {
  req.session.user = req.user
  res.redirect('/products')
}

export const register = async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body

  if (!firstName || !lastName || !email || !age || !password) {
    return res.status(400).send('Incomplete values')
  }

  const user = await sessionsServices.create(firstName, lastName, email, age, createHash(password))

  if (!user) res.status(400).send('User not created')
  res.redirect('http://localhost:8080/login')
}
