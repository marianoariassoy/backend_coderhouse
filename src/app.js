import express from 'express'
// import MongoStore from 'connect-mongo'
import session from 'express-session'
import handlebars from 'express-handlebars'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import './database.js'

// Setup
const PORT = 8080
const app = express()
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
server.on('error', error => console.log('Error: ', error))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Views

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middlewares

initializePassport()
app.use(
  session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
