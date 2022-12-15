const request = require("supertest")
const db = require('../db')
const app = require('../../server')
const User = require('../../Models/user.model')
const config = require('../../Configs/config')
const jwt = require("jsonwebtoken")
const client = require('../../Utilis/notificationClient').client



beforeAll(async() => {
    await db.clearDatabase();
    await User.create({
        name: "Pranit Dubal",
        userId: "1",
        emailId: "pranitd5@gmail.com",
        password: "pwd",
        userType: "ENGINEER",
        userStatus: "APPROVED"
    })
})

afterAll(async() => {
    await db.closeDatabase();
    app.close();
})

const api_endpoint = "/crm/api/v1/";

const testTicketPayLoad = {
    title: "Test",
    description: "Testing",
    ticketPriority: 4,
    status: "OPEN",
    reporter: "1",
    assignee: "1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    save: jest.fn()
}
let updatedId;

xdescribe("Post Ticket Creation Endpoint", () => {
    jest.spyOn(client, "post").mockImplementation((url, args, cb) => cb("Test", null))

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("Should create ticket", async() => {
        const res = await request(app)
            .post(api_endpoint + 'tickets')
            .set("authorization", token)
            .send(testTicketPayLoad)
        updatedId = res.body.id;

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                title: "Test",
                description: "Testing",
                ticketPriority: 4,
                status: "OPEN",
                reporter: "1",
                assignee: "1"
            })

        )
    })
});

xdescribe("Put Ticket Updation Endpoint", () => {

    jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("Should Updation", async() => {
        const res = await request(app)
            .put(api_endpoint + 'tickets/' + updatedId)
            .set("authorization", token)
            .send(testTicketPayLoad)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                title: "Test",
                description: "Testing",
                ticketPriority: 4,
                status: "OPEN",
                reporter: "1",
                assignee: "1"
            })
        )
    })
});

xdescribe(" Get All Tickets Endpoint", () => {

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("Should get all tickets", async() => {
        const res = await request(app)
            .get(api_endpoint + 'tickets')
            .set('authorization', token)
            .send()
            // updatedId = res.body[0].userId

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: "Test",
                    description: "Testing",
                    ticketPriority: 4,
                    status: "OPEN",
                    reporter: "1",
                    assignee: "1"
                })
            ])
        )
    })
});

describe(" Get One Ticket Endpoint", () => {

    var token = 'Bearer ' + jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120
    })

    it("Should get one ticket", async() => {
        const res = await request(app)
            .get(api_endpoint + 'tickets/' + updatedId)
            .set('authorization', token)
            .send()

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                title: "Test",
                description: "Testing",
                ticketPriority: 4,
                status: "OPEN",
                reporter: "1",
                assignee: "1"
            })
        )
    })
})