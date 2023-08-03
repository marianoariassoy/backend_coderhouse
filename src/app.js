import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

server.on('error', (error) => console.log('Error: ', error))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
