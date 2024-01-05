import { usersServices } from '../repositories/index.js'
import { isValidatePassword } from '../utils.js'
import { UserDTO } from '../dao/dtos/users.dto.js'
import { emailInactiveUsers } from '../utilities/mailing.js'

const getAllUsers = async (req, res) => {
  const users = await usersServices.getAll()
  const result = users.map(user => new UserDTO(user))
  res.send({ status: 'success', payload: result })
}

const deleteInactiveUsers = async (req, res) => {
  const users = await usersServices.getAll()
  const result = []
  const dateLimit = new Date() - 1000 * 60 * 60 * 24 * 2
  users.forEach(user => {
    if (user.last_connection < dateLimit) {
      usersServices.delete(user._id)
      result.push(user)
      emailInactiveUsers(user.email)
        ? console.log(`Email sent to ${user.email}`)
        : console.log(`Email not sent to ${user.email}`)
    }
  })

  res.send({ status: 'success', payload: result })
}

const getUserById = async (req, res) => {
  const { uid } = req.params
  const result = await usersServices.getById(uid)
  if (!result) return res.status(404).send({ status: 'error', error: 'user no found' })
  res.send({ status: 'success', payload: result })
}

const createUser = async (req, res) => {
  const result = await usersServices.create(req.body)
  if (!result) return res.status(400).send({ status: 'error', error: 'user already exists' })
  else res.send({ status: 'user created', payload: result })
}

const deleteUserById = async (req, res) => {
  const result = await usersServices.delete(req.params.uid)
  if (!result) return res.status(400).send({ status: 'error', error: 'user not deleted' })
  res.send({ status: 'User deleted', payload: result })
}

const login = async (req, res) => {
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

const premium = async (req, res) => {
  const { uid } = req.params
  const user = await usersServices.getById(uid)
  if (!user) return res.status(404).send({ status: 'error', error: 'user no found' })

  const documents = user.documents
  if (documents.length >= 3) {
    const result = await usersServices.edit(uid, { role: 'premium' })
    if (!result) return res.status(400).send({ status: 'error', error: 'role not updated' })

    res.send({ status: 'User role modified' })
  } else {
    return res.status(400).send({ status: 'error', error: 'documents not enough' })
  }
}

const uploadDocument = async (req, res) => {
  if (!req.file) return res.status(400).send({ status: 'error', error: 'file not uploaded' })
  const path = req.file.path
  const fileName = req.file.originalname

  const user = await usersServices.getById(req.params.uid)
  if (!user) return res.status(404).send({ status: 'error', error: 'user no found' })

  const documents = user.documents
  documents.push({ name: fileName, reference: path })

  const result = await usersServices.edit(req.params.uid, { documents })
  if (!result) return res.status(400).send({ status: 'error', error: 'file not uploaded' })

  res.send({ status: 'file uploaded', payload: req.file })
}

export default {
  getAllUsers,
  deleteInactiveUsers,
  getUserById,
  createUser,
  deleteUserById,
  login,
  premium,
  uploadDocument
}
