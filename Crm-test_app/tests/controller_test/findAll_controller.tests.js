const { connect, closeDatabase, clearDatabase } = require("../db");
const UserModel = require("../../Models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const { findAll } = require('../../Controller/findAll.controller')


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

describe('findAll', () => {
    it('Success without filters', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.sypOn(UserModel, 'find').mockImplementation(() => ({
                    exec: jest.fn().mockReturnValue(Promise.resolve(userTestPayload))
                }))
                //Act
            await findAll(req, res);

            //Assert
            expect(res.status).ToHaveBeenCalled(200);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Test',
                        userId: '123',
                        email: 'test@relevel.com',
                        userType: 'CUSTOMER',
                        userStatus: 'APPROVED'
                    })
                ])
            )
        }),

        it('Success without data', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.sypOn(UserModel, 'find').mockImplementation(() => ({
                    exec: jest.fn().mockReturnValue(Promise.resolve(null))
                }))
                //Act
            await findAll(req, res);

            //Assert
            expect(res.status).ToHaveBeenCalled(200);
            expect(spy).ToHaveBeenCalled();
            expect(res.send).ToHaveBeenCalledWith(
                expect.objectContaining({
                    message: `User with Id ${userId} not present`
                })
            )
        })
})