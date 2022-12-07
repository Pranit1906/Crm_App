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
    it('Success', async() => { //Similar error with expected and receive data
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
            expect(res.status).toHaveBeenCalledWith(200)
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
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
        it('user Not found', async() => { // similar error with expected and received 
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.params.userId = '1';
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                exec: jest
                    .fn()
                    .mockReturnValue(null)
            }))

            //Act
            await findById(req, res)

            //Assert
            expect(res.status).toHaveBeenCalledWith(200)
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User not Found '
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
            expect(res.status).toHaveBeenCalledWith(500)
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error Occurred'
                })
            )
        })

})