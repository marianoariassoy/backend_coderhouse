import express from 'express'
import handlebars from 'express-handlebars'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'

import config from './config/config.js'
import { initializePassport } from './controllers/sessions.controller.js'
import { mongoConnect } from './config/mongo.js'
import { __dirname } from './utilities/utils.js'

// Config
const app = express()
mongoConnect()

// Views
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middlewares
app.use(cors())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

// Server
app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`))
