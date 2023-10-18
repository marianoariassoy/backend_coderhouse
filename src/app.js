import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import passport from 'passport'
import cors from 'cors'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'

// Config
import config from './config/config.js'
import { initializePassport } from './config/passport.config.js'
import './dao/mongo/database.js'
const app = express()

// Views
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middlewares
app.use(cors())
initializePassport()
app.use(
  session({
    secret: config.sessionSecret,
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

// Server
const PORT = config.port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
