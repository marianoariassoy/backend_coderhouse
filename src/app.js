import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import { __dirname } from './utils.js'

const app = express()
const PORT = 8080

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

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

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://santo:santo@cluster0.8ix6f.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true
  })
)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
