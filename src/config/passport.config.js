import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import { usersModel } from '../models/users.model.js'

export const initializePassport = () => {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.a6ceb427284c9262',
        clientSecret: '00ac78dd69cd3ab7755e467085459abee8da94db',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile)
          const user = await usersModel.findOne({ email: profile._json.email })

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              email: profile._json.email,
              password: ''
            }
            const result = await usersModel.create(newUser)
            done(null, result)
          } else {
            done(null, user)
          }
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
  })
}
