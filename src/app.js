import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
server.on('error', error => console.log('Error: ', error))
