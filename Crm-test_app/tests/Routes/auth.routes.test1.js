const request = require("supertest");
const db = require('../db');
const app = require('../../server');

beforeAll(async() => { await db.clearDatabase() });
afterAll(async() => {
    await db.closeDatabase();
    app.close(); //closing server
})

const api_endpoint = "/crm/api/v1/";

const testPayLoad = {
    name: "Test",
    userId: "2",
    password: "pwd",
    emailId: "test@relevel.com",
    userType: "CUSTOMER",
    userStatus: "APPROVED",
    ticketCreated: [],
    ticketAssigned: []
}

xdescribe("Post SignUp Endpoint", () => {
    it("should SignUp", async() => {
        const res = await request(app)
            .post(api_endpoint + 'auth/signup')
            .send(testPayLoad)

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                response: expect.objectContaining({
                    "emailId": "test@relevel.com",
                    "name": "Test",
                    "userId": "2",
                    "userStatus": "APPROVED",
                    "userType": "CUSTOMER"
                })
            })

        )
    })
})

xdescribe('Post Login Endpoint', () => {
    it('Should Login', async() => {
        const res = await request(app)
            .post(api_endpoint + 'auth/login')
            .send(testPayLoad)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                "emailId": "test@relevel.com",
                "name": "Test",
                "userId": "2",
                "userStatus": "APPROVED",
                "userType": "CUSTOMER"
            })
        )
    })
})