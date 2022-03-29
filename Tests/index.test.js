import app from "../index.js"
import request from "supertest"

//Ejecucion Test
//set NODE_OPTIONS=--experimental-vm-modules && npx jest --detectOpenHandles

describe("GET /users", () =>{
    test("Should respond with status 200", async() => {
        const response = await request(app).get("/users").send()
        console.log(response);
    })
})