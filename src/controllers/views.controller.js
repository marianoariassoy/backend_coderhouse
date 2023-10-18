import { productsModel } from '../dao/mongo/models/products.model.js'

export const login = async (req, res) => {
  res.render('login', { session: req.session.user })
}

export const register = (req, res) => {
  res.render('register', { session: req.session.user })
}

export const profile = (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const { firstName, lastName, email, age } = req.session.user
  res.render('profile', { firstName, lastName, email, age, session: req.session.user })
}

export const logout = (req, res) => {
  delete req.session.user
  res.redirect('login')
}

export const products = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const products = await productsModel.find().lean()
  const { email } = req.session.user

  res.render('products', { email, session: req.session.user, products })
}
