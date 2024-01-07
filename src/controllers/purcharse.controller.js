import Carts from '../dao/classes/carts.dao.js'
import nodemailer from 'nodemailer'
const cartsServices = new Carts()

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'ahorasanto@gmail.com',
    pass: 'atkz cniq bmxw uqhd'
  }
})

export const purcharse = async (req, res) => {
  const result = await cartsServices.getById(req.params.cid)
  if (!result) return res.send({ status: 'error', error: 'Cart not found' })
  const products = result.products

  let html = `<h1>Purcharse</h1>
  <h2>Name: ${req.user.name}</h2>
  <h2>Email: ${req.user.email}</h2>
  <h1>Products</h1>`

  products.forEach(p => {
    html += `<h2>Product: ${p.product.title}</h2>
    <h2>Quantity: ${p.quantity}</h2> 
    <h2>Price: ${p.product.price}</h2>`
  })

  const sendEmail = await transport.sendMail({
    from: 'CoderHouse Backend <ahorasanto@gmail.com>',
    to: req.user.email,
    subject: 'Purcharse',
    html
  })
  if (!sendEmail) return res.send({ status: 'error', error: 'Email not sent' })

  res.send({ status: 'Email sent', products, name: req.user.name, email: req.user.email })
}
