import request from 'supertest'
import { app, closeConnection } from '../index.js'

describe('GET /users', () => {
    test('Should respond with status 200', async () => {
        const response = await request(app).get('/users').send()
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
        const response = await request(app).post('/users').send(user)
        const idUser = response.body._id
        const responseUser = await request(app).get('/users/' + idUser).send()
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
        const response = await request(app).post('/users').send(user)
        const idUser = response.body._id
        await request(app).delete('/users/' + idUser).send()
        const userDeleted = await request(app).get('/users/' + idUser).send()
        expect(userDeleted.status).toBe(404)
    })
})

describe('POST invalid User', () => {
    test('Should respond with status 409', async () => {
        const emptyUser = {}
        const response = await request(app).post('/users').send(emptyUser)
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
        const responsePost = await request(app).post('/users').send(newUser)
        const idUser = responsePost.body._id
        const responseGet = await request(app).get('/users/' + idUser).send()
        expect(responseGet.status).toBe(200)
    })
})
afterAll(() => {
    return closeConnection()
})
