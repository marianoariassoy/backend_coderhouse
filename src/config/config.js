import dotenv from 'dotenv'

dotenv.config()
export default {
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DB_URL
}
