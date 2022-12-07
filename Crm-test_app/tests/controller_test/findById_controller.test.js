const { findById } = require('../../Controller/findById.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const { connect, closeDatabase, clearDatabase } = require('../db');
const UserModel = require('../../Models/user.model');

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });
const testpayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    userType: "CUSTOMER",
    userStatus: "PENDNG",
    ticketsCreated: [],
    ticketsAssigned: []
}

xdescribe('findById', () => {
    it('Success', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params.userId = '1';
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(Promise.resolve([testpayload]))
            }))

            //Act
            await findById(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalledWith(200)
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test",
                        userId: "1",
                        emailId: "test@relevel.com",
                        userType: "CUSTOMER",
                        userStatus: "PENDNG"
                    })
                ])
            )
        }),
        it('user Not found', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params.userId = '1';
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => { throw new Error("Error Occurred") })
            }))

            //Act
            await findById(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalledWith(200)
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User with id 1 not Found '
                })
            )
        }),
        it('Failure ', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params.userId = '1';
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => { throw new Error("Error Occurred") })
            }))

            //Act
            await findById(req, res)

            //Assert
            expect(res.status).ToHaveBeenCalledWith(500)
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error Occurred'
                })
            )
        })

})