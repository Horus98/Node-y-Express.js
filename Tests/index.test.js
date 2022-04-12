import request from 'supertest'
import { app, closeConnection } from '../index.js'
import dotenv from 'dotenv'
dotenv.config()
const token = process.env.TOKEN_TEST
const generateRandomString = (length = 12) => Math.random().toString(20).substr(2, length)

describe('GET /users', () => {
    test('Should respond with status 200', async () => {
        const response = await request(app).get('/users').set('token', token).send()
        expect(response.status).toBe(200)
    }, 30000)
})

describe('POST /users', () => {
    test('Should respond with status 200', async () => {
        const user = {
            firstName: 'Horus',
            lastName: 'Moro',
            address: 'Av.Siempre Viva',
            age: 99
        }
        const response = await request(app).post('/users').set('token', token).send(user)
        const idUser = response.body._id
        const responseUser = await request(app).get('/users/' + idUser).set('token', token).send()
        expect(responseUser.status).toBe(200)
    })
})

describe('DELETE /users', () => {
    test('Should respond with status 404', async () => {
        const user = {
            firstName: 'Probando',
            lastName: 'Eliminar',
            address: 'Av.Siempre Viva',
            age: 200
        }
        const response = await request(app).post('/users').set('token', token).send(user)
        const idUser = response.body._id
        await request(app).delete('/users/' + idUser).set('token', token).send()
        const userDeleted = await request(app).get('/users/' + idUser).set('token', token).send()
        expect(userDeleted.status).toBe(404)
    })
})

describe('POST invalid User', () => {
    test('Should respond with status 409', async () => {
        const emptyUser = {}
        const response = await request(app).post('/users').set('token', token).send(emptyUser)
        expect(response.status).toBe(409)
    })
})

describe('GET new User', () => {
    test('Should respond with status 200', async () => {
        const newUser = {
            firstName: 'Obtener',
            lastName: 'Usuario',
            address: 'GET method',
            age: 200
        }
        const responsePost = await request(app).post('/users').set('token', token).send(newUser)
        const idUser = responsePost.body._id
        const responseGet = await request(app).get('/users/' + idUser).set('token', token).send()
        expect(responseGet.status).toBe(200)
    })
})

describe('VERIFY TOKEN', () => {
    test('Should be the same tokens', async () => {
        const user = {
            email: generateRandomString() + '@gmail.com',
            password: generateRandomString()
        }
        const response = await request(app).post('/auth/register').send(user)
        const token = response.body.token
        const responseLogin = await request(app).post('/auth/login').send(user)
        const tokenLogin = responseLogin.body.token
        expect(token).toBe(tokenLogin)
    })
})

describe('INVALID TOKEN', () => {
    test('Should respond with status 401', async () => {
        const invalidToken = 'This is an invalid token'
        const respose = await request(app).get('/users').set('token', invalidToken).send()
        expect(respose.status).toBe(401)
    })
})

afterAll(() => {
    return closeConnection()
})
