import express from 'express'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import config from './config/config.js'
import { initializePassport } from './controllers/sessions.controller.js'
import { mongoConnect } from './config/mongo.js'

// Config
const app = express()
mongoConnect()

// Middlewares
app.use(cors())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(express.json())

// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

// Server
app.listen(config.port, () => console.log(`🚀 @ http://localhost:${config.port}`))
