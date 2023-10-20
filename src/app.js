import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import passport from 'passport'
import cors from 'cors'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/views.router.js'

// Config
import config from './config/config.js'
import { mongoConnect } from './config/mongo.js'
import { initializePassport } from './config/passport.config.js'
import { __dirname } from './utilities/utils.js'
const app = express()
mongoConnect()

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
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Server
app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`))
