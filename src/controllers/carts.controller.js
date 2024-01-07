import Carts from '../dao/classes/carts.dao.js'
const cartsServices = new Carts()

export const getAllCarts = async (req, res) => {
  const result = await cartsServices.get()
  res.send({ status: 'Success', payload: result })
}

export const getCartById = async (req, res) => {
  const result = await cartsServices.getById(req.params.cid)
  if (!result) return res.send({ status: 'error', error: 'Cart not found' })
  res.send({ status: 'Success', payload: result })
}

export const createCart = async (req, res) => {
  const result = await cartsServices.create(req.user.email)
  if (!result) return res.send({ status: 'error', error: 'Cart not created' })
  res.send({ status: 'Cart created', payload: result })
}

export const addProduct = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await cartsServices.getById(cid)
  if (cart) {
    const products = cart.products
    if (products.length > 0) {
      const find = products.find(x => x.product?._id?.toString() === pid)
      if (find) find.quantity++
      else products.push({ product: pid, quantity: 1 })
    } else products.push({ product: pid, quantity: 1 })

    await cartsServices.edit(cid, products)
    res.send({ status: 'Product added', payload: cart })
  } else res.status(404).json({ status: 'error', message: 'Cart not found' })
}

export const deleteProduct = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await cartsServices.getById(cid)

  if (cart) {
    const products = cart.products
    const find = products.find(x => x.product?._id?.toString() === pid)
    if (find) {
      const newProducts = products.filter(x => x.product?._id?.toString() !== pid)
      const result = await cartsServices.edit(cid, newProducts)
      if (!result) return res.send({ status: 'error', error: 'product not edited' })
      res.send({ status: 'product deleted', payload: newProducts })
    } else return res.send({ status: 'error', error: 'product not found' })
  } else res.status(404).json({ status: 'error', message: 'cart not found' })
}

export const deleteCart = async (req, res) => {
  const { cid } = req.params
  const cart = await cartsServices.getById(cid)
  if (cart) {
    const result = await cartsServices.delete(cid)
    res.send({ status: 'Cart deleted', payload: result })
  } else res.status(404).json({ message: 'Cart not found' })
}
