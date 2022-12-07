const { connect, closeDatabase, clearDatabase } = require("../db");
const UserModel = require("../../Models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const { findAll } = require('../../Controller/findAll.controller')


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
    //With filters is pending.........

describe('findAll', () => {
    it('Success without filters', async() => { //Not working due to mismatch
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                    exec: jest.fn().mockReturnValue(Promise.resolve([userTestPayload]))
                }))
                //Act
            await findAll(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        response: expect.objectContaining({
                            name: 'Test',
                            userId: '123',
                            email: 'test@relevel.com',
                            userType: 'CUSTOMER',
                            userStatus: 'APPROVED'
                        })
                    })
                ])
            )
        }),

        it('Success without data', async() => {
            //Arrange
            const req = mockRequest();
            const res = mockResponse();
            req.query = {};
            const spy = jest.spyOn(UserModel, 'find').mockImplementation(() => ({
                    exec: jest.fn().mockReturnValue(Promise.resolve(null))
                }))
                //Act
            await findAll(req, res);

            //Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(spy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User  not present'
                })
            )
        })
})