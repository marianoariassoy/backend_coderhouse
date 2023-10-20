import Users from '../dao/classes/users.dao.js'
import { createHash, isValidatePassword } from '../utilities/utils.js'
const usersServices = new Users()

export const getAllUsers = async (req, res) => {
  const users = await usersServices.get()
  res.send({ status: 'success', payload: users })
}

export const register = async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body

  if (!firstName || !lastName || !email || !age || !password) {
    return res.status(400).send('Incomplete values')
  }

  const user = await usersServices.create(firstName, lastName, email, age, createHash(password))
  if (!user) res.status(400).send('User not created')
  else res.send({ status: 'User created', payload: user })
}

export const deleteUser = async (req, res) => {
  const { uid } = req.params
  const users = await usersServices.delete(uid)
  res.send({ status: 'User deleted', payload: users })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).render('login', { error: 'Incomplete values' })

  const user = usersServices.get(email)

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
