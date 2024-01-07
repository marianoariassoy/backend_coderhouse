import passport from 'passport'
import local from 'passport-local'
import passportJwt from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { usersServices } from '../repositories/index.js'
import config from '../config/config.js'
import { isValidatePassword } from '../utils.js'
import { UserDTO } from '../dao/dtos/users.dto.js'

const LocalStrategy = local.Strategy
const JWTStrategy = passportJwt.Strategy
const ExtractJWT = passportJwt.ExtractJwt

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies[config.cookieSecret]
  }
  return token
}

export const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwtSecret
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload)
        } catch (error) {
          return done(error, false, { message: 'Something went wrong' })
        }
      }
    )
  )

  passport.use(
    'jwt-header',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload)
        } catch (error) {
          return done(error, false, { message: 'Something went wrong' })
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        failureFlash: true
      },
      async (email, password, done) => {
        try {
          const user = await usersServices.getByEmail(email)
          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          if (!isValidatePassword(password, user.password)) {
            return done(null, false, { message: 'Wrong password' })
          }
          return done(null, user)
        } catch (error) {
          return done(null, false, { message: 'Something went wrong' })
        }
      }
    )
  )
}

export const login = async (req, res) => {
  const { email, firstName, lastName, role } = req.user
  const name = `${firstName} ${lastName}`

  const token = jwt.sign({ email, name, role }, config.jwtSecret)
  res.cookie(config.cookieSecret, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  })

  await usersServices.updateConnection(req.user._id, new Date())
  console.log('User logged in with email', req.user.email)
  res.send({ status: 'Logged in', user: new UserDTO(req.user), token })
}

export const logout = async (req, res) => {
  await usersServices.updateConnection(req.user._id, new Date())
  res.clearCookie(config.cookieSecret)
  res.send({ status: 'Logged out' })
}
