import app from "../index.js"
import request from "supertest"

//Ejecucion Test
//set NODE_OPTIONS=--experimental-vm-modules && npx jest --detectOpenHandles

describe("GET /users", () => {
    test("Should respond with status 200", async() => {
        const response = await request(app).get("/users").send()
    })
})

describe("POST /users", () => {
    test("Should respond with status 200", async() => {
        const user = {
            firstName: "Horus",
            lastName: "Moro",
            address: "Av.Siempre Viva",
            age: 99
        }
        const response = await request(app).post("/users").send(user)
        const idUser = response.body._id
        const responseUser = await request(app).get("/users/" + idUser).send()
        expect(responseUser.status).toBe(200)
    })
})

console.log("Andara?...")