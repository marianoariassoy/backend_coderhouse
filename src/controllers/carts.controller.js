import Carts from '../dao/classes/carts.dao.js'
const cartsServices = new Carts()

export const getAllCarts = async (req, res) => {
  const result = await cartsServices.get()
  res.send({ status: 'success', payload: result })
}

export const getCartById = async (req, res) => {
  const { cid } = req.params
  const cart = await cartsServices.getById(cid)
  if (cart) {
    res.send({ status: 'success', payload: cart })
  } else res.status(404).json({ message: 'Cart not found' })
}

export const createCart = async (req, res) => {
  const cart = await cartsServices.create()
  if (cart) {
    res.send({ status: 'success', payload: cart })
  }
}

export const addProduct = async (req, res) => {
  const { cid } = req.params
  const { product } = req.body
  const cart = await cartsServices.getById(cid)

  if (cart) {
    const products = cart.products || []

    if (products.length > 0) {
      const find = products.find(x => x.product?._id?.toString() === product)

      if (find) {
        find.quantity++
      } else {
        products.push({ product, quantity: 1 })
      }
    } else {
      products.push({ product, quantity: 1 })
    }

    await cartsServices.edit(cid, products)
    res.send({ status: 'product added', payload: cart })
  } else res.status(404).json({ message: 'Cart not found' })
}

export const deleteProduct = async (req, res) => {
  const { cid, pid } = req.params
  const cart = await cartsServices.getById(cid)
  if (cart) {
    const products = cart.products
    const product = products.filter(x => x.product?._id?.toString() !== pid)
    const result = await cartsServices.edit(cid, product)
    if (result) {
      res.send({ status: 'product deleted', payload: cart })
    }
  } else {
    res.status(404).json({ message: 'cart not found' })
  }
}

export const deleteCart = async (req, res) => {
  const { cid } = req.params
  const cart = await cartsServices.getById(cid)
  if (cart) {
    const result = await cartsServices.delete(cid)
    if (result) {
      res.send({ status: 'cart deleted', payload: cart })
    }
  } else {
    res.status(404).json({ message: 'cart not found' })
  }
}
