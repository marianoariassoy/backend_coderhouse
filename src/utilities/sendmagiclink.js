import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'ahorasanto@gmail.com',
    pass: 'atkz cniq bmxw uqhd'
  }
})

export const sendmagiclink = async (email, token) => {
  const html = `<h1>Please click on the link to reset your password</h1> <h2>${token}</h1>`

  const sendEmail = await transport.sendMail({
    from: 'CoderHouse Backend <ahorasanto@gmail.com>',
    to: email,
    subject: 'Reset your password',
    html
  })
  if (!sendEmail) return false
}
