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
  const html = `<h1>Please click on the link to reset your password</h1> <h2>${token}</h2>`

  const sendEmail = await transport.sendMail({
    from: 'CoderHouse Backend <ahorasanto@gmail.com>',
    to: email,
    subject: 'Reset your password',
    html
  })
  if (!sendEmail) return false
  console.log(`Email sended to ${email}`)
}

export const emailInactiveUsers = async email => {
  const html = `<p>Estimado usuario, debido a la inactividad de su cuenta, su cuenta ha sido eliminada</p>
  <p>Gracias por confiar en nuestra plataforma</p>`

  const sendEmail = await transport.sendMail({
    from: 'CoderHouse Backend <ahorasanto@gmail.com>',
    to: email,
    subject: 'Reset your password',
    html
  })
  if (!sendEmail) return false
  console.log(`Email sended to ${email}`)
}

export const emailDeleteProducts = async email => {
  const html = '<p>Estimado usuario su producto ha sido eliminado</p>'

  const sendEmail = await transport.sendMail({
    from: 'CoderHouse Backend <ahorasanto@gmail.com>',
    to: email,
    subject: 'Product deleted',
    html
  })
  if (!sendEmail) return false
  console.log(`Email sended to ${email}`)
}
