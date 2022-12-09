const { findAllTickets } = require('../../../Controller/ticket.controller/ticket.findAll.controller');
const { mockRequest, mockResponse } = require('../../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../../db');
const UserModel = require('../../../Models/user.model');
const TicketModel = require('../../../Models/ticket.model');



const ticketPayLoad = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    reporter: "1",
    assignee: "1",
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


beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

describe('findAllTickets', () => {
    // it('success', async() => {
    //     // Arrange
    //     const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
    //         exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
    //     }))
    //     const ticketSpy = jest.spyOn(TicketModel, 'find').mockImplementation(() => ({
    //         exec: jest.fn().mockReturnValue(Promise.resolve([ticketPayLoad]))
    //     }))
    //     const req = mockRequest();
    //     const res = mockResponse();
    //     req.query = {};
    //     req.userId = "1"

    //     // Act
    //     await findAllTickets(req, res);

    //     // Assert
    //     expect(userSpy).toHaveBeenCalled();
    //     expect(ticketSpy).toHaveBeenCalled();
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.send).toHaveBeenCalledWith(
    //         expect.arrayContaining([
    //             expect.objectContaining({
    //                 title: "Test",
    //                 ticketPriority: 4,
    //                 description: "Testing",
    //                 status: "OPEN",
    //                 reporter: "1",
    //                 assignee: "1",
    //             })
    //         ])
    //     )
    // })

    it('Success', async() => {
        //Arrange
        req = mockRequest();
        res = mockResponse();
        req.query = {};

        const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
            exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
        }))

        const ticketSpy = jest.spyOn(TicketModel, 'find').mockImplementation(() => ({
            exec: jest.fn().mockReturnValue(Promise.resolve([ticketPayLoad]))
        }))

        //Act
        await findAllTickets(req, res)

        //Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(userSpy).toHaveBeenCalled();
        expect(ticketSpy).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    title: "Test",
                    ticketPriority: 4,
                    description: "Test",
                    status: "OPEN",
                    reporter: "1",
                    assignee: "1",
                })
            ]))
    })
})