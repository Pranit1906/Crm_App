const { createTicket } = require('../../../Controller/ticket.controller/ticket.controller');
const { mockRequest, mockResponse } = require('../../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../../db');
const UserModel = require('../../../Models/user.model');
const TicketModel = require('../../../Models/ticket.model');
const client = require('../../../Utilis/notificationClient').client;

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

const ticketPayLoad = {
    title: "Test",
    ticketPriority: 4,
    description: "Testing",
    status: "OPEN",
    reporter: 1,
    assignee: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    save: jest.fn()
}

const userTestPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "PENDNG",
    ticketsCreated: [],
    ticketsAssigned: [],
    save: jest.fn()
}

xdescribe('Ticket', () => {
    it('Success in ticket creation', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = ticketPayLoad;
            req.userId = "1";
            const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
            }));
            const clientSpy = jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));
            //Act
            await createTicket(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(userSpy).toHaveBeenCalled();
            expect(clientSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Test",
                    ticketPriority: 4,
                    description: "Testing",
                    Status: "OPEN",
                    reporter: '1',
                    assignee: '1',
                })
            )

        }),
        it('Failure in ticket creation', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = ticketPayLoad;
            req.userId = "1";
            const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
            }))
            const ticketSpy = jest.spyOn(TicketModel, 'create').mockReturnValue(Promise.reject(null))
                //Act
            await createTicket(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(userSpy).toHaveBeenCalled();
            expect(ticketSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Error Occurred in Ticket Creation!"
                })
            )
        })
})