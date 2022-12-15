const { ticketFindById } = require('../../../Controller/ticket.controller/ticket.findById.controller');
const { mockRequest, mockResponse } = require('../../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../../db');
const UserModel = require('../../../Models/user.model');
const TicketModel = require('../../../Models/ticket.model');

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

const ticketPayLoad = {
    title: "Test",
    ticketPriority: 4,
    description: "Testing",
    status: "OPEN",
    reporter: "1",
    assignee: "1",
    _id: "1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    save: jest.fn()
}


xdescribe('findById', () => {
    it('Success', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params = { id: "1" }
            const ticketSpy = jest.spyOn(TicketModel, "findOne").mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(ticketPayLoad))
            }))

            //Act
            await ticketFindById(req, res);

            //Assert

            expect(res.status).toHaveBeenCalledWith(200);
            expect(ticketSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Test",
                    ticketPriority: 4,
                    description: "Testing",
                    status: "OPEN",
                    reporter: '1',
                    assignee: '1',
                })

            )
        }),

        it("should fail", async() => {
            //Arrange
            const res = mockResponse();
            const req = mockRequest();
            req.params = { id: "1" }
            const ticketSpy = jest.spyOn(TicketModel, 'findOne').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.reject(null))
            }))

            //Act
            await ticketFindById(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(500)
            expect(ticketSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Ticket Not found!'
                })
            )
        })
})