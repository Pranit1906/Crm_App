const { connect, closeDatabase, clearDatabase } = require("../db");
const UserModel = require("../../Models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const update = require('../../Controller/update.controller')


beforeAll(async() => { await connect() });
beforeEach(async() => { await closeDatabase() });
afterAll(async() => { await clearDatabase() });

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
            const spy = jest.sypOn(UserModel, 'findOneAndUpdate').mockImplementation(() => ({
                    exec: () => { throw new Error('Error Occurred') }
                }))
                //Act
            await update(req, res);

            //Assert
            expect(res.status).ToHaveBeenCalledWith(500);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
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
            expect(res.status).ToHaveBeenCalledWith(200);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User record updated successfully'
                })
            )
        })
})

//01:00:00