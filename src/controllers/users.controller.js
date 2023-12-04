import { usersServices } from '../repositories/index.js'
import { isValidatePassword } from '../utils.js'

export const get = async (req, res) => {
  const result = await usersServices.get()
  res.send({ status: 'success', payload: result })
}

export const getById = async (req, res) => {
  const result = await usersServices.getById(req.params.uid)
  if (!result) return res.status(404).send({ status: 'error', error: 'user no found' })
  res.send({ status: 'success', payload: result })
}

export const create = async (req, res) => {
  const result = await usersServices.create(req.body)
  if (!result) return res.status(400).send({ status: 'error', error: 'user already exists' })
  else res.send({ status: 'user created', payload: result })
}

export const deleteById = async (req, res) => {
  const result = await usersServices.delete(req.params.uid)
  if (!result) return res.status(400).send({ status: 'error', error: 'user not deleted' })
  res.send({ status: 'User deleted', payload: result })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(401).render('login', { error: 'Incomplete values' })

  const user = usersServices.get(email)

  if (!user) return res.status(404).render('login', { error: 'User not found' })
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

export const premium = async (req, res) => {
  const { uid } = req.params
  const user = await usersServices.getById(uid)
  if (!user) return res.status(404).send({ status: 'error', error: 'user no found' })

  const role = user.role === 'admin' ? 'premium' : 'admin'
  const result = await usersServices.changeRole(uid, role)
  if (!result) return res.status(400).send({ status: 'error', error: 'role not updated' })

  res.send({ status: 'User role modified', payload: role })
}
