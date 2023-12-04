import passport from 'passport'
import local from 'passport-local'
import passportJwt from 'passport-jwt'
import jwt from 'jsonwebtoken'

import { isValidatePassword } from '../utils.js'
import { usersServices } from '../repositories/index.js'

// Config
const LocalStrategy = local.Strategy
const JWTStrategy = passportJwt.Strategy
const ExtractJWT = passportJwt.ExtractJwt

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt-cookie']
  }
  return token
}

export const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
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
        usernameField: 'email'
      },
      async (email, password, done) => {
        try {
          const user = await usersServices.getByEmail(email)
          if (!user) {
            return done(null, false, { message: 'user not found' })
          }

          if (!isValidatePassword(password, user.password)) {
            return done(null, false, { message: 'wrong password' })
          }
          return done(null, user)
        } catch (error) {
          return done(null, false, { message: 'something went wrong' })
        }
      }
    )
  )
}

export const login = async (req, res) => {
  const { email, firstName, lastName, role } = req.user
  const name = `${firstName} ${lastName}`

  const token = jwt.sign({ email, name, role }, process.env.JWT_SECRET)
  res.cookie('jwt-cookie', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  })
  res.send({ stutus: 'Logged in', token })
}
