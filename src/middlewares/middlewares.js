import passport from 'passport'

export const passportCall = strategy => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send({ error: info.message ? info.message : info })
      }
      req.user = user
      next()
    })(req, res, next)
  }
}

export const authorization = role => {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      if (role === 'admin') return res.status(403).send({ error: 'only admin can access' })
      if (role === 'user') return res.status(403).send({ error: 'only user can access' })
      return res.status(403).send({ error: 'forbidden' })
    }

    next()
  }
}
