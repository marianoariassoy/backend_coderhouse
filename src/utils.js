import bcrypt from 'bcrypt'
import multer from 'multer'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidatePassword = (user, password) => bcrypt.compareSync(user, password)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/documents')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const upload = multer({ storage })
