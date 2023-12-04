import express from 'express'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import config from './config/config.js'
import { initializePassport } from './controllers/sessions.controller.js'
import { mongoConnect } from './config/mongo.js'
import { __dirname } from './utils.js'

// Config
const app = express()
mongoConnect()

// Middlewares
app.use(cors())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(express.json())

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentation API REST CoderHouse',
      description: 'API REST en Node.js para CoderHouse'
    }
  },
  apis: [`${__dirname}/docs/**/*.yml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

// Server
app.listen(config.port, () => console.log(`🚀 @ http://localhost:${config.port}`))
