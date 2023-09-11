import express from 'express'
import mongoose from 'mongoose'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
const PORT = 8080

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
server.on('error', error => console.log('Error: ', error))

mongoose
  .connect('mongodb+srv://santo:santo@cluster0.8ix6f.mongodb.net/?retryWrites=true&w=majority')

  .then(() => {
    console.log('Connected to the database')
  })
  .catch(error => {
    console.error('Error connecting to the database:', error)
  })
