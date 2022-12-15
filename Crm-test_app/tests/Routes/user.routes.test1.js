const request = require("supertest");
const db = require('../db');
const app = require('../../server');
const User = require('../../Models/user.model');
const config = require("../../Configs/config");
const jwt = require("jsonwebtoken");


beforeAll(async() => {
    await db.clearDatabase();
    await User.create({
        name: "Pranit Dubal",
        userId: "1",
        emailId: "pranitd5@gmail.com",
        password: "pwd",
        userType: "ADMIN",
        userStatus: "APPROVED"
    })
})

const api_endpoint = '/crm/api/v1/'

afterAll(async() => {
    await db.closeDatabase();
    app.close();
})

xdescribe("Get findById Endpoints", () => {

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("should find by Id", async() => {
        const res = await request(app)
            .get(api_endpoint + 'users/1')
            .set('authorization', token)
            .field('userId', 1)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Pranit Dubal",
                    userId: "1",
                    emailId: "pranitd5@gmail.com",
                    userType: "ADMIN",
                    userStatus: "APPROVED"
                })
            ])
        )
    })
})

xdescribe("Get Find All Endpoint", () => {

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("should Find All", async() => {
        const res = await request(app)
            .get(api_endpoint + 'users')
            .query('userType', "ADMIN")
            .set("authorization", token)
            .field("userId", 1)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Pranit Dubal",
                    userId: "1",
                    emailId: "pranitd5@gmail.com",
                    userType: "ADMIN",
                    userStatus: "APPROVED"
                })
            ])
        )
    })
})

xdescribe("Update Endpoint", () => {

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("should Update", async() => {
        const res = await request(app)
            .put(api_endpoint + 'users/1')
            .query("userType", "ADMIN")
            .set("authorization", token)
            .field("userId", 1)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                message: 'User record updated successfully'
            })
        )
    })
})