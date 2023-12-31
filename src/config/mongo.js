import mongoose from 'mongoose'

export const mongoConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Connected to the database')
    })
    .catch(error => {
      console.error('Error connecting to the database:', error)
    })
}
