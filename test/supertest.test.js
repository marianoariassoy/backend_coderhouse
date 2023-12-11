import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing supertest', () => {
  let userMock
  let cookie
  let userId
  let productId

  describe('Test de usuarios', () => {
    it('Crear un nuevo usuario', async () => {
      userMock = {
        email: 'supertest-usuario-2@email.com',
        firstName: 'supertest',
        lastName: 'supertest',
        age: 20,
        password: '123456',
        role: 'admin'
      }
      const { statusCode, _body } = await requester.post('/api/users/register').send(userMock)
      expect(statusCode).to.equal(200)
      userId = _body.payload._id
    })
  })

  describe('Test de sesiones', () => {
    it('Loguearse con un usuario existente', async () => {
      const result = await requester.post('/api/sessions/login').send(userMock)
      const cookieResult = result.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }
      expect(cookie.name).to.be.ok.and.eql('jwt-cookie')
      expect(cookie.value).to.be.ok
    })
  })

  describe('Test de productos', () => {
    it('Obtener todos los productos', async () => {
      const { statusCode } = await requester.get('/api/products')
      expect(statusCode).to.equal(200)
    })

    it('Cear un nuevo producto correctamente con el token obtenido', async () => {
      const productMock = {
        title: 'test',
        description: 'test',
        code: 'test',
        price: 100,
        image: 'test',
        category: 'test',
        stock: 100
      }
      const { _body } = await requester
        .post('/api/products')
        .set('Cookie', `${cookie.name}=${cookie.value}`)
        .send(productMock)

      expect(_body.payload).to.have.property('_id')
      productId = _body.payload._id
    })

    it('Modificar un producto existente con el token obtenido', async () => {
      const productMock = {
        stock: 0
      }
      const { statusCode } = await requester
        .put(`/api/products/${productId}`)
        .set('Cookie', `${cookie.name}=${cookie.value}`)
        .send(productMock)

      expect(statusCode).to.equal(200)
    })

    it('Eliminar un producto existente con el token obtenido', async () => {
      const { statusCode } = await requester
        .delete(`/api/products/${productId}`)
        .set('Cookie', `${cookie.name}=${cookie.value}`)

      expect(statusCode).to.equal(200)
    })

    it('Eliminar un usuario existente con el token obtenido', async () => {
      const { statusCode } = await requester
        .delete(`/api/users/${userId}`)
        .set('Cookie', `${cookie.name}=${cookie.value}`)

      expect(statusCode).to.equal(200)
    })
  })
})
