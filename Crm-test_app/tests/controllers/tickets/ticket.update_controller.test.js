const { updateTicket } = require('../../../Controller/ticket.controller/ticket.update.controller');
const { mockRequest, mockResponse } = require('../../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../../db');
const UserModel = require('../../../Models/user.model');
const TicketModel = require('../../../Models/ticket.model');
const client = require('../../../Utilis/notificationClient').client;


const ticketPayLoad = {
    title: "Test",
    ticketPriority: 4,
    description: "Testing",
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

xdescribe('updateTicket', () => {
    it('Success in updating ticket', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = ticketPayLoad;
            req.userId = '1';

            const ticketSpy = jest.spyOn(TicketModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(ticketPayLoad))
            }))

            const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
            }))

            const clientSpy = jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));

            ticketPayLoad.save.mockReturnValue(ticketPayLoad);

            //Act
            await updateTicket(req, res)

            //Assert :- An assertion is a statement in the Java programming language that enables you to test your assumptions about your program
            expect(res.status).toHaveBeenCalledWith(200);
            expect(ticketSpy).toHaveBeenCalled();
            expect(userSpy).toHaveBeenCalled();
            expect(clientSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                // expect.arrayContaining([
                expect.objectContaining({
                    title: "Test",
                    ticketPriority: 4,
                    description: "Testing",
                    status: "OPEN",
                    reporter: '1',
                    assignee: '1',
                })
                // ])
            )
        }),

        it('Failure in finding user', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = ticketPayLoad;


            const ticketSpy = jest.spyOn(TicketModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(ticketPayLoad))
            }))

            userTestPayload.userId = "2"

            const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
            }));

            req.userId = "1";
            //Act
            await updateTicket(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(401);
            expect(userSpy).toHaveBeenCalled();
            expect(ticketSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User Not Authorised to change the ticket'
                })
            )
        }),

        it('Failure in updating', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.body = ticketPayLoad;


            const ticketSpy = jest.spyOn(TicketModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(ticketPayLoad))
            }))

            // userTestPayload.userId = "2"

            const userSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.reject(null))
            }));

            req.userId = "1";
            //Act
            await updateTicket(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(userSpy).toHaveBeenCalled();
            expect(ticketSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Internal Error Occurred'
                })
            )
        })

})