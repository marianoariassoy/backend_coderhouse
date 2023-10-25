import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import { isValidatePassword } from '../utilities/utils.js'
import { usersServices } from '../repositories/index.js'

// Config
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt-cookie']
  }
  return token
}

const initializePassport = () => {
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

export default initializePassport
