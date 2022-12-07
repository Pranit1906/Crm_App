const { connect, closeDatabase, clearDatabase } = require("../db");
const UserModel = require("../../Models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const { update } = require('../../Controller/update.controller')


beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

const userTestPayload = {
    name: 'Test',
    userId: '123',
    email: 'test@relevel.com',
    userType: 'CUSTOMER',
    userStatus: 'APPROVED'
}

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

describe('update', () => {
    it('Failure case', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params = { userId: '1' };
            const spy = jest.spyOn(UserModel, 'findOneAndUpdate').mockImplementation(() => ({
                    exec: () => { throw new Error('Error Occurred') }
                }))
                //Act
            await update(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Some Error Occurred'
                })
            )
        }),

        it("Success case", async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params.userId = "1";
            const spy = jest.spyOn(UserModel, "findOneAndUpdate").mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve(testPayload))
            }))

            //Act
            await update(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User record updated successfully'
                })
            )
        })
})

//01:00:00