const UserModel = require("../../../Mongoose-test3/Models/user.model");
const { signup, login } = require("../../../Mongoose-test3/Controllers/auth.Controller/auth.controller");
const { connect, closeDatabase, clearDatabase } = require("../db");
var bcrypt = require('bcrypt');
const { mockRequest, mockResponse } = require("../interceptor");

const testPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "PENDNG",
    ticketsCreated: [],
    ticketsAssigned: []
}

beforeAll(async() => { await connect() });
beforeEach(async() => { await closeDatabase() });
afterAll(async() => { await clearDatabase() });

describe('signup', () => {
    it('success', async() => {
        //Arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = testPayload;

        //Act
        await signup(req, res);

        //Assert
        expect(res.status).ToBeCalledWith(201);
        expect(res.send).ToBeCalledWith(
            expect.objectContaining({
                name: "Test",
                userId: "1",
                emailId: "test@relevel.com",
                userType: "CUSTOMER",
                userStatus: "PENDING"
            })
        )
    })
})

//01:26:00